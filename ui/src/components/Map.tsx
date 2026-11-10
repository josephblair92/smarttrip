import { Tooltip } from "react-tooltip"
import MetroMap from "../assets/wmataMap.svg?react"
import { useEffect, type CSSProperties } from "react"
import type { DisplayProps } from "../types"

const formatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short"
})
const tooltipStyles: CSSProperties = {
  borderRadius: "1rem",
  backgroundColor: "#e4e4e4",
  color: "black",
  fontSize: "1rem",
  width: "15rem",
  maxHeight: "20rem",
  overflowX: "hidden",
  boxShadow: "5px 5px 5px 1px rgb(0 0 0 / 40%)"
}

export function Map({ data }: DisplayProps) {
  useEffect(() => {
    document.querySelectorAll('[data-tooltip-id="map"]').forEach(el => {
      const stopId = el.getAttribute("data-stop-id")
      const notVisited = !data[stopId as keyof typeof data]
      const fillColor = notVisited ? "#000000" : "#FFFFFF"
      if (el.tagName === "g") {
        const { children } = el
        for (const child of children) {
          child.setAttribute("fill", fillColor)
        }
      } else {
        el.setAttribute("fill", fillColor)
      }
    })
  }, [data])

  const renderFn = ({ activeAnchor }: { activeAnchor: Element | null }) => {
    const stopId = activeAnchor?.getAttribute("data-stop-id")
    const timestamps = stopId ? (data[stopId] ?? []) : []
    return (
      <div>
        <h3 className="font-bold">
          {stopId} ({timestamps.length})
        </h3>
        {timestamps && timestamps.length ? (
          timestamps.map((timestamp, index) => <p key={index}>{formatter.format(timestamp)}</p>)
        ) : (
          <p>No visits yet.</p>
        )}
      </div>
    )
  }
  return (
    <>
      <MetroMap className="h-[91vh] w-auto" />
      <Tooltip
        id="map"
        clickable
        noArrow
        opacity={1.0}
        border="0.1rem solid gray"
        style={tooltipStyles}
        render={renderFn}
      />
    </>
  )
}
