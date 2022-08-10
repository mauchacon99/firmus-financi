import React, { useEffect } from "react";
import { Network } from "vis-network";
import { assets } from "../config/img/assets-storage";

const VisNetwork = React.forwardRef(
  ({ nodes, edges, setImgPrint }, visJsRef) => {
    const approxLinesOfText = Math.ceil(
      nodes.reduce((prev, curr) => prev + (curr.label?.length || 0), 0) / 14
    );

    const height = 2 * (approxLinesOfText + edges.length);

    useEffect(() => {
      const options = {
        nodes: {
          size: 15,
          font: { color: "#000000", alignment: "right" },
        },
        edges: {
          color: "blue",
          font: "10px",
          scaling: {
            label: false,
          },
          smooth: false,
        },
        physics: false,

        groups: {
          users: {
            shape: "icon",
            icon: {
              face: "'FontAwesome'",
              code: "\uf007",
              size: 100,
              color: "#aa00ff",
            },
          },
          company: {
            shape: "icon",
            icon: {
              face: "'FontAwesome'",
              code: "\uf1ad",
              size: 100,
              color: "#f0a30a",
            },
          },
          custody: {
            shape: "image",
            image: { selected: assets.public.svg.iconTest },
          },
        },
      };
      const networkCanvas = new Network(
        visJsRef.current,
        { nodes, edges },
        options
      );
      visJsRef.current &&
        networkCanvas.on("afterDrawing", function (ctx) {
          var contentForPrint = ctx.canvas.toDataURL();
          setImgPrint(contentForPrint);
        });
      var scaleOption = { scale: 4 };
      networkCanvas.moveTo(scaleOption);
    }, [visJsRef, nodes, edges, setImgPrint]);

    return (
      <>
        <style type="text/css" media="print">
          {"\
            @page { size: letter;  }\
            "}
        </style>

        <div
          ref={visJsRef}
          style={{
            height: `${height < 150 ? 150 : height}em`,
            width: `${8 * nodes.length + 8}em`,
            maxWidth: "100%",
            minWidth: "100%",
            maxHeight: "1050px",
            position: "absolute",
            backgroundImage: `url(${assets.public.watermarkCopyright})`,
          }}
        />
      </>
    );
  }
);

export default VisNetwork;
