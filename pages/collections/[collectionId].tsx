import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";
import NFTCard from "../../components/NftCard";
import { client } from "../../lib/sanityClient";

const style = {
  bannerImageContainer: `h-[40vh] w-screen flex justify-center items-center`,
  bannerImage: `w-full h-[40vh] object-cover blur`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  headContainer: `w-full flex justify-center text-white`,
  headingRow: `w-full flex justify-start align-left text-white`,
  statsRow: `w-full flex justify-end align-right text-white`,
  profileImg: `w-60 h-60 object-cover rounded-full mt-[-4rem] z-10`,
  titleRow: `flex flex-col w-full`,
  title: `text-6xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border-2 border-[#151b22] rounded-full mb-4 overflow-hidden`,
  collectionStat: `w-1/4 flex flex-col align-center justify-evenly`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
};

const Collection = () => {
  const router = useRouter();
  const { provider } = useWeb3();

  const { collectionId } = router.query;
  const [collection, setCollection] = useState({});

  const [nfts, setNfts] = useState([]);
  const [listings, setListings] = useState([]);

  const nftModule = useMemo(() => {
    if (!provider) return;

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      process.env.NEXT_PUBLIC_ALCHEMY_TOKEN!
    );
    return sdk.getNFTModule(collectionId);
  }, [provider]);

  // get all NFTs in the collection
  useEffect(() => {
    if (!nftModule) return;
    (async () => {
      const nfts = await nftModule.getAll();

      setNfts(nfts);
    })();
  }, [nftModule]);

  const marketPlaceModule = useMemo(() => {
    if (!provider) return;

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      process.env.NEXT_PUBLIC_ALCHEMY_TOKEN!
    );
    return sdk.getMarketplaceModule(process.env.NEXT_PUBLIC_MARKETPLACE!);
  }, [provider]);
  // get all listings in the collection
  useEffect(() => {
    if (!marketPlaceModule) return;
    (async () => {
      setListings(await marketPlaceModule.getAllListings());
    })();
  }, [marketPlaceModule]);

  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "marketItems" && contractAddress == "${collectionId}" ] {
      "imageUrl": profileImage.asset->url,
      "bannerImageUrl": bannerImage.asset->url,
      volumeTraded,
      createdBy,
      contractAddress,
      "creator": createdBy->userName,
      title, floorPrice,
      "allOwners": owners[]->,
      description
    }`;

    const collectionData = await sanityClient.fetch(query);

    // console.log(collectionData);
    await setCollection(collectionData[0]);
  };

  useEffect(() => {
    fetchCollectionData();
  }, [collectionId]);

  return (
    <div>
      {/* NAVBAR */}
      <Header />

      {/* BANNER */}
      <div className={style.bannerImageContainer}>
        <img
          className={style.bannerImage}
          src={
            collection?.bannerImageUrl
              ? collection.bannerImageUrl
              : "https://via.placeholder.com/200"
          }
          alt="banner"
        />
      </div>

      {/* PROFILE IMAGE */}
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <img
            className={style.profileImg}
            src={
              collection?.imageUrl
                ? collection.imageUrl
                : "https://via.placeholder.com/200"
            }
            alt="profile image"
          />
        </div>
        <div className={style.headContainer}>
          <div className={style.titleRow}>
            {/* TITLE */}
            <div className={style.headingRow}>
              <div className={style.title}>{collection?.title}</div>
            </div>
            {/* CREATED BY */}
            <div className={style.headingRow}>
              <div className={style.createdBy}>
                Created by{" "}
                <span className="text-[#2081e2]">
                  {collection?.creator == "Unnamed"
                    ? collection?.title
                    : collection?.creator}
                </span>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className={style.statsRow}>
            <div className={style.statsContainer}>
              <div className={style.collectionStat}>
                <div className={style.statValue}>{nfts.length}</div>
                <div className={style.statName}>items</div>
              </div>
              <div className={style.collectionStat}>
                <div className={style.statValue}>
                  {collection?.allOwners ? collection.allOwners.length : ""}
                </div>
                <div className={style.statName}>owners</div>
              </div>
              <div className={style.collectionStat}>
                <div className={style.statValue}>
                  <img
                    src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                    alt="eth"
                    className={style.ethLogo}
                  />
                  {collection?.floorPrice}
                </div>
                <div className={style.statName}>floor price</div>
              </div>
              <div className={style.collectionStat}>
                <div className={style.statValue}>
                  <img
                    src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                    alt="eth"
                    className={style.ethLogo}
                  />
                  {collection?.volumeTraded}.5K
                </div>
                <div className={style.statName}>volume traded</div>
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className={style.midRow}>
          <div className={style.description}>{collection?.description}</div>
        </div>
      </div>

      {/* NFTs SHOWCASE*/}
      <div className="flex flex-wrap pt-4 space-x-5">
        {nfts.map((nftItem, id) => (
          <NFTCard
            key={id}
            nftItem={nftItem}
            title={collection?.title}
            listings={listings}
          />
        ))}
      </div>
    </div>
  );
};

export default Collection;
