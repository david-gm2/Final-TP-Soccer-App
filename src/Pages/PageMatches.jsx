import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { MatchForm } from "../components/matches/MatchForm.jsx";
import { PlayerSelection } from "../components/matches/PlayerSelection.jsx";
import { MatchPreview } from "../components/matches/MatchPreview.jsx";
import { MatchSummary } from "../components/matches/MatchSummary.jsx";

import { usePlayers } from "../hooks/usePlayers.js";
import { useListPlayer } from "../hooks/useListPlayer.js";
import { useURLFilters } from "../hooks/useURLFilters.js";
import { useURLSearch } from "../hooks/useURLSearch.js";
import { filterPlayers } from "../utils/filterPlayers.js";
import { API_BACKEND_URL } from "../constants/API_CONSTANTS.js";

import "../styles/PageMatches.css";
import "../styles/PlayerFiltrer.css";

const MATCH_FORMATS = ["5v5", "6v6", "7v7", "8v8", "9v9"];

const FORM_FIELDS = [
  { name: "datetime-local", type: "datetime-local", label: "Date*", required: "Date is required" },
  { name: "location", type: "text", label: "Location*", placeholder: "Location", required: "Location is required" },
  { name: "teamA", type: "text", label: "Team A Name*", placeholder: "Team A", required: "Team A name is required" },
  { name: "teamB", type: "text", label: "Team B Name*", placeholder: "Team B", required: "Team B name is required" },
  { name: "matchName", type: "text", label: "Match name (Optional)", placeholder: "Match name" },
];

const POSITION_FILTERS = [
  { label: "All", value: "all" },
  { label: "Goalkeeper", value: "goalkeeper" },
  { label: "Defender", value: "defender" },
  { label: "Midfielder", value: "midfielder" },
  { label: "Forward", value: "forward" },
];

function PageMatches() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      format: MATCH_FORMATS[0],
      location: "",
      teamA: "",
      teamB: "",
      matchName: "",
    },
  });

  const selectedFormat = watch("format");
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [autoBalance, setAutoBalance] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payloadMessage, setPayloadMessage] = useState("");

  useListPlayer(setIsLoading);
  const { players } = usePlayers();

  const { active: activeFilters, toggle: toggleFilter } = useURLFilters("position");
  const { value: searchQuery, setValue: setSearchQuery } = useURLSearch("player");

  const filteredPlayers = useMemo(
    () => filterPlayers(players, activeFilters, searchQuery),
    [players, activeFilters, searchQuery]
  );

  const selectedPlayerDetails = useMemo(
    () => players.filter((p) => selectedPlayers.includes(p.player_id)),
    [players, selectedPlayers]
  );

  const teams = useMemo(() => {
    const ordered = autoBalance
      ? [...selectedPlayerDetails].sort(
          (a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0)
        )
      : selectedPlayerDetails;
    const teamA = [];
    const teamB = [];
    ordered.forEach((player, index) => {
      const target = index % 2 === 0 ? teamA : teamB;
      target.push(player);
    });
    return { teamA, teamB };
  }, [selectedPlayerDetails, autoBalance]);

  const avgRating = (team) => {
    if (!team.length) return 0;
    const total = team.reduce((sum, player) => sum + (Number(player.rating) || 0), 0);
    return Number((total / team.length).toFixed(1));
  };

  const rateBalance = Math.abs(avgRating(teams.teamA) - avgRating(teams.teamB)).toFixed(1);

  const togglePlayerSelection = (playerId) => {
    setSelectedPlayers((prev) =>
      prev.includes(playerId)
        ? prev.filter((id) => id !== playerId)
        : [...prev, playerId]
    );
  };

  const shuffleTeams = () => {
    setSelectedPlayers((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const levelLabel = (rating) => {
    if (rating === null || rating === undefined || rating === "") return "Lv —";
    const parsed = Number.parseFloat(rating);
    return Number.isFinite(parsed) ? `Lv ${parsed.toFixed(1)}` : `Lv ${rating}`;
  };

  const formatPosition = (pos) => {
    if (!pos) return "Unknown";
    return pos.charAt(0).toUpperCase() + pos.slice(1);
  };

  const playerPerTeam = Number(selectedFormat?.split("v")[0]) || 0;

  const matchDateInput = watch("datetime-local");
  const locationInput = watch("location");
  const teamAName = watch("teamA");
  const teamBName = watch("teamB");
  const matchName = watch("matchName");

  const matchToCreate = useMemo(() => {
    const sanitizeName = (value, fallback) =>
      value?.trim().length ? value.trim() : fallback;

    return {
      name: matchName?.trim() || undefined,
      location: locationInput?.trim() || "",
      playerPerTeam,
      match_date: matchDateInput ? new Date(matchDateInput).toISOString() : null,
      homeTeam: {
        name: sanitizeName(teamAName, "Team A"),
        playersIds: teams.teamA
          .slice(0, playerPerTeam || teams.teamA.length)
          .map((player) => player.player_id),
      },
      awayTeam: {
        name: sanitizeName(teamBName, "Team B"),
        playersIds: teams.teamB
          .slice(0, playerPerTeam || teams.teamB.length)
          .map((player) => player.player_id),
      },
    };
  }, [
    matchName,
    locationInput,
    playerPerTeam,
    matchDateInput,
    teamAName,
    teamBName,
    teams,
  ]);

  const onSubmit = async (data) => {
    if (
      !playerPerTeam ||
      teams.teamA.length < playerPerTeam ||
      teams.teamB.length < playerPerTeam
    ) {
      alert(`Select at least ${playerPerTeam * 2 || "the required"} players to form both teams.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BACKEND_URL}/matches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(matchToCreate),
      });

      if (!response.ok) {
        throw new Error(`Failed to create match: ${response.statusText}`);
      }

      alert("Match created successfully!");
    } catch (error) {
      console.error("Error creating match:", error);
      alert("Unable to create match. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="matches-page">
      <div className="match-layout">
        <div className="match-form-column">
          <MatchForm
            matchFormats={MATCH_FORMATS}
            selectedFormat={selectedFormat}
            onSelectFormat={(format) =>
              setValue("format", format, { shouldValidate: true })
            }
            fields={FORM_FIELDS}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            isSubmitting={isSubmitting}
          />
          {/* hidden inputs to keep format registered */}
          {MATCH_FORMATS.map((format) => (
            <input
              key={format}
              type="radio"
              value={format}
              style={{ display: "none" }}
              {...register("format", { required: "Choose a format" })}
            />
          ))}

          <PlayerSelection
            selectedCount={selectedPlayers.length}
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            filters={POSITION_FILTERS}
            activeFilters={activeFilters}
            onToggleFilter={toggleFilter}
            players={filteredPlayers}
            isLoading={isLoading}
            selectedPlayers={selectedPlayers}
            onTogglePlayer={togglePlayerSelection}
            levelLabel={levelLabel}
            formatPosition={formatPosition}
          />
        </div>

        <div className="match-sidebar-column">
          <MatchPreview
            teams={teams}
            playerPerTeam={playerPerTeam}
            selectedFormat={selectedFormat}
            autoBalance={autoBalance}
            onToggleAutoBalance={setAutoBalance}
            onShuffle={shuffleTeams}
            avgRating={avgRating}
            rateBalance={rateBalance}
            levelLabel={levelLabel}
            homeTeamName={matchToCreate.homeTeam.name}
            awayTeamName={matchToCreate.awayTeam.name}
          />

          <MatchSummary
            match={matchToCreate}
            onCopy={(message) => setPayloadMessage(message)}
          />
          {payloadMessage && (
            <p className="payload-feedback" role="status">
              {payloadMessage}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default PageMatches;
