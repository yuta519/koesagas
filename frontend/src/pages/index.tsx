import Link from "next/link";

export interface Transcript {
  id: string;
  rawText: string;
  highlightText: string;
  startAt: number;
  endAt: number;
  formatedStartAt: string;
  formatedEndAt: string;
}

const App = () => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        <Link href="/podcasts">To Podcast</Link>
      </h1>
    </div>
  );
};

export default App;
