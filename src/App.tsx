import MainLayout from './components/layout/MainLayout';

function App(): JSX.Element {
  return (
    <MainLayout>
      <div className=" flex flex-col gap-10 w-full">
        <div className="flex flex-col gap-4">
          <div className="text-5xl font-bold bg-gradient-to-b from-gradient-start via-gradient-middle to-gradient-end bg-clip-text text-transparent">
            Simplus React Boilerplate
          </div>
          <div className="text-neutral-700">Simplus React Boilerplate by Simplus Labs</div>
        </div>
        <div className="border-dashed	border-2 rounded-md h-96 text-4xl	font-bold items-center flex justify-center text-neutral-400">
          Tool Here
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
