import Header from "../components/header";
// import Footer from "../components/footer";

const withLayout = (Page: React.ComponentType, title: string, showBackButton:boolean) => {
  return () => (
    <div className='background'>
      <Header title={title} showBackButton={showBackButton}/>
      <Page />
      {/* <Footer /> */}
    </div>
  );
};

export default withLayout;