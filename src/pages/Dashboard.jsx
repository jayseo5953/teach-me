import Button from '@/components/ui/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Link from '@/components/ui/Link';
import Input from '@/components/ui/Input';
import Sheet from '@/components/ui/Sheet';

function Dashboard() {
  return (
    <>
      <Link to={'/pre-chat'}>Start Teaching</Link>
      <br />
      --------------------------------------------
      <br />
      UI examples below
      <br />
      <br />
      <Sheet>
        <Input />
        <Button variant="contained">Search</Button>
      </Sheet>
      <br />
      <br />
      <Sheet shadowDepth="soft">
        <Button>Search</Button>
      </Sheet>
      <br />
      <br />
      <Sheet shadowDepth="none">
        <Button variant="contained" startIcon={<ChevronLeftIcon />}>
          Search
        </Button>
      </Sheet>
      <br />
      <br />
      <Sheet isFullWidth>Take full width</Sheet>
      <br />
      <br />
      <Sheet onClick={() => alert('sheet is clicked!')}>I can be clicked</Sheet>
      <br />
      <br />
      <div>
        <Button startIcon={<ChevronLeftIcon />}>Search</Button>
      </div>
    </>
  );
}

export default Dashboard;
