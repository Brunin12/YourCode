import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";

export type StartupTypeCard = Omit<Startup, "author"> & {author?: Author};

const StartupCard = ({ startup }: { startup: StartupTypeCard }) => {
  const {
    _id,
    _createdAt,
    views,
    author,
    category,
    title,
    description,
    image,
  } = startup;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>

        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-[#E60076]" />
          <span className="font-medium text-[16px]">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="font-medium text-[16px] line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startups/${_id}`}>
            <h3 className="text-[26px] font-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image ?? ""}
            alt="imagem do usuario"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>
      <Link href={`/startups/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <img
          src={image}
          alt="imagem da startup"
          className="startup-card_img"
        />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category}`}>
        <p className="font-medium text-[16px]">
          {category}
        </p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>
          Detalhes
          </Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
