import { Input } from '@mui/material';
import Button from '@/components/ui/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Link from '@/components/ui/Link';

function Dashboard() {
  return (
    <>
      <Input />
      <br />
      <br />

      <Button variant="contained">Search</Button>
      <br />
      <Button>Search</Button>
      <br />
      <Button variant="contained" startIcon={<ChevronLeftIcon />}>
        Search
      </Button>
      <br />
      <Button startIcon={<ChevronLeftIcon />}>Search</Button>
      <br />
      <Link to={'/pre-chat'}>Start Teaching</Link>
    </>
  );
}

export default Dashboard;
