import React, { useState } from "react";
import "./Sidebar.css";
import SidebarOptions from "./SidebarOptions";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import SidebarOption from "./SidebarOptions";
import { useDataLayerValue } from "./DataLayer";

function Sidebar() {
  const [{ playlist }, dispatch] = useDataLayerValue();

  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        src="https://www.getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="Spotify Logo"
      ></img>

      {/* This will fetch the icon from material ui and set the home search and your library */}

      <SidebarOptions Icon={HomeIcon} title="Home" />
      <SidebarOptions Icon={SearchIcon} title="Search" />
      <SidebarOptions Icon={LibraryMusicIcon} title="Your Library" />

      <br />
      <strong className="sidebar__title">PLAYLIST</strong>
      <hr />

      {/* This will pull the playlist and set it according to user who is logged in */}

      {playlist?.items?.map((playlist) => (
        <SidebarOption title={playlist.name} />
      ))}
    </div>
  );
}

export default Sidebar;
