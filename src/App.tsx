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
            WhatsApp Link Generator Tool
          </div>
          <div className="text-neutral-700">
            Generate Instant WhatsApp Links with Just a Phone Number: Access quick WhatsApp conversations with our link
            generation app. Start chatting instantly by entering the phone number!
          </div>
        </div>
        <div className="flex gap-12 items-center justify-between flex-col md:flex-row w-fit">
          <MessageProvider>
            <Form />
            <Preview />
          </MessageProvider>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
