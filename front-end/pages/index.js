import Reward from "@/components/Reward";
import {
  ChangeNetWorkdModal,
  CrowdFunding,
  Exchange,
  Footer,
  Header,
  ICO,
  ModalError,
  ModalInstallMetamask,
  Profit,
  Staking,
  Welcome,
} from "../components";
import Intro from "@/components/Intro";

export default function Home() {
  return (
    <main className="">
      <Header />
      <Intro />
      <Welcome />
      <Exchange />
      <ChangeNetWorkdModal />
      <Reward />
      <ICO />
      <CrowdFunding />
      <Staking />
      <Profit />
      <ModalInstallMetamask />
      <Footer />
    </main>
  );
}
