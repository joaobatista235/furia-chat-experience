import React, { useState, useEffect } from 'react';
import { MockLiveService } from '../../infrastructure/api/MockLiveService';
import {
  LiveMatchContainer,
  MatchHeader,
  Timer,
  TeamsContainer,
  Team,
  Score,
  VS,
  EventsContainer,
  Event
} from '../styles/components/LiveMatch.styles';

const LiveMatch = () => {
  const [matchData, setMatchData] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const liveService = new MockLiveService();
    
    const unsubscribe = liveService.subscribe((data) => {
      if (data.type === 'match_update' || data.type === 'event') {
        setMatchData(data.match);
        setEvents(data.events || []);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!matchData) {
    return (
      <LiveMatchContainer>
        <MatchHeader>
          <h2>Carregando partida...</h2>
        </MatchHeader>
      </LiveMatchContainer>
    );
  }

  return (
    <LiveMatchContainer>
      <MatchHeader>
        <h2>{matchData.event}</h2>
        <Timer>{matchData.timer}</Timer>
      </MatchHeader>
      <TeamsContainer>
        <Team>
          <img src={matchData.team1.logo} alt={matchData.team1.name} />
          <h3>{matchData.team1.name}</h3>
        </Team>
        <VS>VS</VS>
        <Team>
          <img src={matchData.team2.logo} alt={matchData.team2.name} />
          <h3>{matchData.team2.name}</h3>
        </Team>
      </TeamsContainer>
      <Score>
        {matchData.team1.score} - {matchData.team2.score}
      </Score>
      <EventsContainer>
        {events.map((event, index) => (
          <Event key={index} type={event.type}>
            <span className="time">{event.time}</span>
            <span className="description">{event.description}</span>
          </Event>
        ))}
      </EventsContainer>
    </LiveMatchContainer>
  );
};

export default LiveMatch; 