import assets from "../config/img/assets-storage.ts";

const prepareNodeTypeNaturalPerson = (id, { first_name, last_name }) => {
  return {
    label: `${first_name} ${last_name}`,
    id,
    shape: "icon",
    group: "users",
  };
};

const prepareNodeTypeLegalPerson = (id, { name: label }) => {
  return {
    label,
    id,
    shape: "icon",
    group: "company",
  };
};

const prepareEdges = ({ details }, { id: custodyAccountId }) => {
  if (details) {
    const { IDPARENT: parentId, IDCONTROL: controlId, lookup } = details;
    return {
      to: parentId || custodyAccountId,
      from: controlId,
      label: lookup.valueString,
      font: { align: "horizontal" },
      arrows: "to",
      length: 100,
    };
  }
};

export const handleCustodyAccount = async ({
  custodian,
  Name,
  Id: id,
  custodyAccountDetail,
}) => {
  console.log(custodian.custodianDetail);
  const accountCustody = {
    label: `${custodian.name} - ${Name}`,
    id,
    shape: "image",
    image: {
      selected: custodian.custodianDetail?.logo_SVG,
      unselected: assets.public.png.iconBankDefault,
    },
  };
  const listDeclarationsControl = [];
  const listEdges = [];

  custodyAccountDetail.declarationControl.forEach((item) => {
    var newNode = item.naturalPerson
      ? prepareNodeTypeNaturalPerson(item.ID, item.naturalPerson)
      : prepareNodeTypeLegalPerson(item.ID, item.legalPerson);
    var newEdges = prepareEdges(item, accountCustody);

    listDeclarationsControl.push(newNode);

    newNode = null;
    if (newEdges) listEdges.push(newEdges);
  });
  return {
    edges: listEdges,
    nodes: [...listDeclarationsControl, accountCustody],
  };
};

export default handleCustodyAccount;
