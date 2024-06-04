import HeaderBox from "@/components/HeaderBox";

const Dashboard = () => {
  const loggedIn = { firstName: "Kenneth" };
  return (
    <section className="home">
      <div className="home-content">
        <div className="home-header">
          <HeaderBox
            type={"greeting"}
            title={"Welcome"}
            user={loggedIn?.firstName || "Guest"}
            subTitle={
              "Access and manage your account and transactions efficiently."
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
