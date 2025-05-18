import Image from "next/image";

function Footer() {
  return (
    <footer className="sm:px-16 py-4 px-8 flex justify-between items-center gap-2 flex-wrap bg-[#161921]">
      <p className="text-base font-bold text-white">@2025 EpicAnimeArchive by Saksham</p>
      <Image
        src="./logo.svg"
        alt="logo"
        width={47}
        height={44}
        className="object-contain"
        style={{ width: 'auto', height: 'auto' }} // Added to fix aspect ratio warning
      />
      <div className="flex items-center gap-6">
        <Image
          src="./tiktok.svg"
          alt="logo"
          width={19}
          height={19}
          className="object-contain"
          style={{ width: 'auto', height: 'auto' }} // Added to fix aspect ratio warning
        />
        <Image
          src="./instagram.svg"
          alt="logo"
          width={19}
          height={19}
          className="object-contain"
          style={{ width: 'auto', height: 'auto' }} // Added to fix aspect ratio warning
        />
        <Image
          src="./twitter.svg"
          alt="logo"
          width={19}
          height={19}
          className="object-contain"
          style={{ width: 'auto', height: 'auto' }} // Added to fix aspect ratio warning
        />
      </div>
    </footer>
  );
}

export default Footer;
