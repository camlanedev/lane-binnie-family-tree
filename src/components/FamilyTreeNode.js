import React from 'react';

const textLayout = {
  vertical: {
    title: {
      textAnchor: 'start',
      x: 40,
    },
    attributes: {},
    attribute: {
      x: 40,
      dy: '1.2em',
    },
  },
  horizontal: {
    title: {
      textAnchor: 'start',
      y: 40,
    },
    attributes: {
      x: 0,
      y: 40,
    },
    attribute: {
      x: 0,
      dy: '1.2em',
    },
  },
};

const flagIcons = {
    "England" : "https://upload.wikimedia.org/wikipedia/commons/b/be/Flag_of_England.svg",
    "Ireland" : "https://upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg",
    "Scotland" : "https://upload.wikimedia.org/wikipedia/commons/1/10/Flag_of_Scotland.svg",
    "Wales" : "https://upload.wikimedia.org/wikipedia/commons/d/de/Flag_of_Wales_%281959%29.svg",
    "Australia" : "https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg"};

const ignoredAttributes = ["links", "gender"];

function toTitleCase(value) {
    return value.charAt(0).toUpperCase() + value.replace(/([A-Z])/g, " $1").slice(1)
}

function getFlagUrl(attributes) {
    return flagIcons[attributes['born']?.split(',').pop().trim()]
}

function getCircleClass(gender) {
    return gender == 'M' ? '#1F4788' : '#C93756'
}

const FlagImage = ({ href }) => {
    return (
        <image height="12" width="17" href={href}></image>
    );
};

const NodeUrl = ({ index, url }) => {
    return (
        <tspan>
            <a href={url} target="_blank" rel="noopener noreferrer">[link {index + 1}]</a><tspan>&nbsp;</tspan>
        </tspan>
    );
};

const AttributeText = ({ key, value, index }) => {
    return (
        <tspan key={`${key}-${index}`}>
            {toTitleCase(key)}: {value}
        </tspan>
    );
};

const FamilyTreeNode = ({ nodeDatum, orientation, toggleNode, onNodeClick }) => {
    return (
    <>
        <circle r={20} fill={getCircleClass(nodeDatum.attributes['gender'])}></circle>
        <g>
            <text className="rd3dag-label__title" {...textLayout[orientation].title}>
                {nodeDatum.name}
            </text>
            <text className="rd3dag-label__attributes">
                {Object.entries(nodeDatum.attributes)
                    .filter(key => !key.includes('links') && !key.includes('gender'))
                    .map(([key, value], i) =>
                        <tspan key={`${key}-${i}`} {...textLayout[orientation].attribute}>
                            {toTitleCase(key)}: {value}
                        </tspan>
                        )
                }
                <tspan {...textLayout[orientation].attribute}>&nbsp;</tspan>

                {nodeDatum.attributes['links'] &&
                    nodeDatum.attributes['links'].map((link, index) =>
                        <NodeUrl index={index} url={link} />
                    )
                }
            </text>
            <FlagImage href={getFlagUrl(nodeDatum.attributes)}/>
        </g>
    </>
  );
};

export default FamilyTreeNode;
