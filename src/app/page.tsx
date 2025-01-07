import { latoSans } from "@/utils/fonts";

const Home = () => {
  return (
    <div>
      <h2 className={`${latoSans.className} font-bold text-[34px]`}>
        Home Page
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos illum nisi
        assumenda placeat iure, aliquam temporibus nulla cum sed hic accusantium
        error odit veniam, eaque fugiat asperiores. Explicabo, quidem sed!
      </p>
    </div>
  );
};

export default Home;
