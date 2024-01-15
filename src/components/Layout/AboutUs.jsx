const AboutUs = () => {
  return (
    <div className="bg-base-100">
      <div className="about-us-container p-8">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="mb-4">
          Welcome to our online group study platform! Our mission is to provide
          a collaborative space where friends can come together, create
          assignments, and enhance their learning experience.
        </p>
        <p className="mb-4">
          With our user-friendly interface, you can easily manage assignments,
          track your progress, and interact with your study group. Whether
          you&apos re a student or a professional, our platform is designed to meet
          your group study needs.
        </p>
        <p className="mb-4">
          We value collaboration, learning, and growth. Join our community and
          embark on a journey of shared knowledge and academic success.
        </p>
        <h3 className="text-2xl font-bold mb-2">Key Features:</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Authentication with social logins</li>
          <li>Assignment creation, deletion, and updating</li>
          <li>Individual assignment submissions and grading</li>
          <li>Dynamic pages for managing assignments</li>
          <li>Bonus features like PDF preview, pagination, and validation</li>
        </ul>
        <p>Thank you for choosing our platform. Happy studying!</p>
      </div>
    </div>
  );
};

export default AboutUs;
