import Link from "next/link";
import { MenuItem as MenuItemType } from "../constants/menu-items";
import { MenuItemContainer } from "./MenuItem.styles";
import MenuItemsList from "../MenuItemsList";
import ExpandIcon from "../ExpandIcon";
import { useState } from "react";
import { useRouter,usePathname, useSearchParams  } from "next/navigation";


type MenuItemProps = {
  menuItem: MenuItemType;
};

export default function MenuItem({
  menuItem: { name, icon: Icon, url, depth, subItems },
}: MenuItemProps) {
  const [isExpanded, toggleExpanded] = useState(false);
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const router = useRouter();
  const currentUrl = `${pathname}?${searchParams}`
  console.log(currentUrl);
  const selected = currentUrl === url;
  const isNested = subItems && subItems?.length > 0;

  const onClick = () => {
    toggleExpanded((prev) => !prev);
  };

  return (
    <>
      <MenuItemContainer className={selected ? "selected" : ""} depth={depth}>
        <Link href={url} passHref>
          <div className="menu-item">
            <Icon />
            <span>{name}</span>
          </div>
        </Link>
        {isNested ? (
          <ExpandIcon isExpanded={isExpanded} handleClick={onClick} />
        ) : null}
      </MenuItemContainer>
      {isExpanded && isNested ? <MenuItemsList options={subItems} /> : null}
    </>
  );
}
