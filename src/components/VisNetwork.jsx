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
            shape: "icon",
            icon: {
              face: "'FontAwesome'",
              code: "\uf0d6",
              size: 100,
              color: "#008000",
            },
          },
          contract: {
            shape: "icon",
            icon: {
              face: "'FontAwesome'",
              code: "\uf1c1",
              size: 100,
              color: "#EE102E",
            },
          },
        },
      };

      visJsRef.current &&
        new Network(visJsRef.current, { nodes, edges }, options).on(
          "afterDrawing",
          function (ctx) {
            var contentForPrint = ctx.canvas.toDataURL();
            setImgPrint(contentForPrint);
          }
        );
    }, [visJsRef, nodes, edges, setImgPrint]);

    return (
      <div
        ref={visJsRef}
        style={{
          height: `${height < 150 ? 150 : height}em`,
          width: `${8 * nodes.length + 8}em`,
          maxWidth: "100%",
          minWidth: "100%",
          maxHeight: "770px",
          backgroundImage: `url(${assets.public.watermarkCopyright})`,
        }}
      />
    );
  }
);

export default VisNetwork;
