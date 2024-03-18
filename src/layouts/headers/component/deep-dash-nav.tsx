import React, { useState } from "react";
import { employ_deep_data } from "@/data/menu-data";
import Link from "next/link";
import { IMenuData } from "@/types/menu-data-type";

const DeepMenus = () => {
  let menuData: IMenuData[] = employ_deep_data;

  return (
    <>
      <ul className="deep-nav list-unstyled  d-flex text-secondary ">
        {menuData.map((obj, index) => {
          return (
            <li className="nav-item active">
              <Link className="nav-link" href={obj.link}>
                {obj.title}
              </Link>
            </li>
          );
        })}
      </ul>
      ;
    </>
  );
};

export default DeepMenus;
