import { _data } from "../Context/Context"
import Mobile from "@/Components/Home/Mobile";
import Desktop from "@/Components/Home/Desktop";
import useWindowSize from "@/lib/useWindowSize";
import { useContext, useEffect, useState } from "react"

export default function Home() {

  const context = useContext(_data);
  const size = useWindowSize();

  return size.width > 640 ? (
    <Desktop context={context} size={size} />
  ):(
    <Mobile context={context} size={size} />
  )
}