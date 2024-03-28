import { PlayersCard } from './PlayersCard';
import { IncomingSessionsCard } from './IncomingSessionsCard';
import { PastSessionsCard } from './PastSessionsCard';

export function IndexPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <PlayersCard />
        <IncomingSessionsCard />
      </div>
      <PastSessionsCard />
    </div>
  );
}
