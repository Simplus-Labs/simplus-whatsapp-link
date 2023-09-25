import MainLayout from './components/layout/MainLayout';
import Form from './components/Form';
import Preview from './components/Preview';
import MessageProvider from './contexts/MessageContext';

function App(): JSX.Element {
  return (
    <MainLayout>
      <div className=" flex flex-col gap-10 w-full">
        <div className="flex flex-col gap-4">
          <div className="text-5xl font-bold bg-gradient-to-b from-gradient-start via-gradient-middle to-gradient-end bg-clip-text text-transparent">
            WhatsApp Link Tool
          </div>
          <div className="text-neutral-700">Simplus React Boilerplate by Simplus Labs</div>
        </div>
        <div className='flex gap-14'>
          <MessageProvider>
            <Form></Form>
            <Preview></Preview>
          </MessageProvider>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
