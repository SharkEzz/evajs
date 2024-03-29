import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

export function Navbar() {
  return (
    <div className="sticky top-0 py-6 backdrop-blur border-b mb-6">
      <div className="container mx-auto flex justify-between">
        <p>EVAjs</p>
        <Button className="gap-2">
          <Plus size={16} />
          M&apos;inscrire à une session
        </Button>
      </div>
    </div>
  );
}
