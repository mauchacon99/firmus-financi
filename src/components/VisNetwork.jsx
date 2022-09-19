import React, { useEffect } from "react";
import { Network } from "vis-network";
import  assets  from "../config/img/assets-storage.ts";

const VisNetwork = React.forwardRef(
  ({ nodes, edges, setImgPrint }, visJsRef) => {
    const approxLinesOfText = Math.ceil(
      nodes.reduce((prev, curr) => prev + (curr.label?.length || 0), 0) / 14
    );

    const height = 2 * (approxLinesOfText + edges.length);

    useEffect(() => {
      const options = {
        interaction: {
          dragNodes: true,
          dragView: true,
          hideEdgesOnDrag: false,
          hideEdgesOnZoom: false,
          hideNodesOnDrag: false,
          hover: false,
          hoverConnectedEdges: true,
          keyboard: {
            enabled: false,
            speed: { x: 10, y: 10, zoom: 0.02 },
            bindToWindow: true,
            autoFocus: true,
          },
          multiselect: false,
          navigationButtons: false,
          selectable: true,
          selectConnectedEdges: true,
          tooltipDelay: 300,
          zoomSpeed: 1,
          zoomView: true,
        },
        physics: {
          // Even though it's disabled the options still apply to network.stabilize().
          enabled: true,
          solver: "repulsion",
          repulsion: {
            nodeDistance: 400, // Put more distance between the nodes.
          },
          timestep: 0.5,
          adaptiveTimestep: true,
        },
        nodes: {
          shape: "triangleDown",
          font: {
            size: 18,
          },
        },
        edges: {
          length: 500, // Longer edges between nodes.
          font: {
            size: 18,
          },
        },
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

      networkCanvas.once("stabilized", function () {
        var scaleOption = { scale: 1.5, throttleRedraw: 10 };
        networkCanvas.moveTo(scaleOption);
      });
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
