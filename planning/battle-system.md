# UDG Battle System

## Example Images

![Battle Example](../assets/images/battle-system-example-small.png)

![Battle Layout](../assets/images/battle-system-layout-small.png)

## Overview

```javascript
const battle = {
  id: 0,
  now: {
    // who is currently acting, how long do they have before the turn ends.
  }
  event: {
    type: "normal_attack",
    initiator: "position_1",
    target: "position_2", //can be null
    effect: 25, //can be null
  },
  position_1: {
    id: "player_id", //player id
    hp: 100,
    mp: 100,
    stm: 100,
  },
  position_2: {
    id: "npc_id", //player id
    hp: 100,
    mp: 100,
    stm: 100,
  },
  position_3: null,
  position_4: null,
  position_5: null,
  position_6: null,
  position_7: null,
  position_8: null,
};

const Action = {
  type: "normal_attack"

}
```

### Minimum requirements

| Type | Group1(Protaganists) | Group2(Antaganists) |
| ---- | -------------------- | ------------------- |
| PVE  | 1 player             | 1 NPC               |
| PVP  | 1 player             | 1 player            |

### Maximum Capacity

| Type | Group1(Protaganists) | Group2(Antaganists) |
| ---- | -------------------- | ------------------- |
| PVE  | 4 players            | 4 NPC               |
| PVP  | 4 players            | 4 players           |

### Battle Process

**in PVE Player always takes action first**

**in PVP Coin flip to determine which group acts first**

Starting with the side that takes action first each side will take one action in turns
one entity from that side will take an action starting with the entity in position 1.

Battle will continue until all entities on one side have perished.

## Client Side

### Actions

During a players turn they get up to 30 seconds to take an action.

#### Action Types

Players can choose between the following types of actions

> Normal Attack

> Use a skill

> Use an item

### Events

When the server sends back the updated battle object to the client

## Sever Side

### Party Integration

## Use for later

| Type | Group1(Protaganists) | Group2(Antaganists) |
| ---- | -------------------- | ------------------- |
|      |                      |                     |

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
|     |     |     |     |     |
|     |     |     |     |     |
|     |     |     |     |     |
