// pages/index.js
import Grid from '../components/Grid';

export default function Home() {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Spreadsheet</h1>
      <Grid />
    </div>
  );
}
