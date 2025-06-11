const LandingPage = () => {
  return (
    <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-10">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-xl text-center">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-4 drop-shadow-sm">Welcome to Concurrance</h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          Welcome to Concurrance!
          We're here to make managing electronic requests easy, clear, and stress-free. With Concurrance,
          every request you make goes through a smooth process — from operators to verifiers to final approval —
          so nothing gets lost or delayed. Whether you’re sending a new request, checking your status,
          or keeping track of what’s happening in your department, everything is right at your fingertips.
          Our goal is simple: help you and your team work faster, stay organized, and focus on what really matters.
          With Concurrance, managing your department’s needs has never been easier or more reliable.
        </p>
      </div>
    </main>
  );
};

export default LandingPage;
