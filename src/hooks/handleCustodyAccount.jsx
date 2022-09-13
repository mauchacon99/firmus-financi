import { assets } from "../config/img/assets-storage";

const prepareNodeTypeNaturalPerson = ({
  id_natural_person: id,
  first_name,
  last_name,
}) => {
  return {
    label: `${first_name} ${last_name}`,
    id,
    shape: "icon",
    group: "users",
  };
};

const prepareNodeTypeLegalPerson = ({ name: label, ID: id }) => {
  return {
    label,
    id,
    shape: "icon",
    group: "company",
  };
};

const prepareEdges = ({ IDCA, details, IDNP, IDLP }) => {
  if (details)
    return {
      to: IDCA,
      from: IDNP || IDLP,
      label: details.lookup.valueString,
      font: { align: "horizontal" },
      arrows: "to",
      length: 100,
    };
};

export const handleCustodyAccount = async ({
  custodian,
  Name,
  Id: id,
  custodyAccountDetail,
}) => {
  const accountCustody = {
    label: `${custodian.name} - ${Name}`,
    id,
    shape: "image",
    image: {
      selected: custodian.custodianDetail?.url_logo,
      unselected: assets.public.svg.iconTest,
    },
  };
  const listDeclarationsControl = [];
  const listEdges = [];

  custodyAccountDetail.declarationControl.forEach((item) => {
    var newNode = item.naturalPerson
      ? prepareNodeTypeNaturalPerson(item.naturalPerson)
      : prepareNodeTypeLegalPerson(item.legalPerson);
    var newEdges = prepareEdges(item);

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
