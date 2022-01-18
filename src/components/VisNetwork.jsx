import React, { useEffect, useRef } from "react";
import { Network } from "vis-network";

const VisNetwork = ({ nodes, edges }) => {
  const options = {
    physics: false,
    groups: {
      users: {
        shape: "icon",
        icon: {
          face: "'FontAwesome'",
          code: "\uf007",
          size: 25,
          color: "#aa00ff",
        },
      },
      company: {
        shape: "icon",
        icon: {
          face: "'FontAwesome'",
          code: "\uf1ad",
          size: 50,
          color: "#f0a30a",
        },
      },
      custody: {
        shape: "icon",
        icon: {
          face: "'FontAwesome'",
          code: "\uf0d6",
          size: 50,
          color: "#008000",
        },
      },
      contract: {
        shape: "icon",
        icon: {
          face: "'FontAwesome'",
          code: "\uf1c1",
          size: 50,
          color: "#EE102E",
        },
      },
    },
  };

  const visJsRef = useRef(null);

  const approxLinesOfText = Math.ceil(
    nodes.reduce((prev, curr) => prev + (curr.label?.length || 0), 0) / 14
  );

  const height = 2 * (approxLinesOfText + edges.length);

  useEffect(() => {
     visJsRef.current && new Network(visJsRef.current, { nodes, edges }, options);
  }, [visJsRef, nodes, edges]);

  return (
    <div
      ref={visJsRef}
      style={{
        height: `${height < 150 ? 150 : height}em`,
        width: `${8 * nodes.length + 8}em`,
        maxWidth: "100%",
        minWidth: "100%",
        maxHeight: "512px",
        border: "1px solid lightgray",
      }}
    />
  );
};

export default VisNetwork;
