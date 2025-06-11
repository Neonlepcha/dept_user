// src/pages/RequestPage.jsx
import RequestForm from '../components/RequestForm';

const RequestPage = () => {
  return (
    <main className="flex-1 p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-center">Request Form</h2>
      <RequestForm />
    </main>
  );
};

export default RequestPage;
