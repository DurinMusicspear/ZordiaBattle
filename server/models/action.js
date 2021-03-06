'use strict';

const TargetType = {
    Allied: 0,
    Enemy: 1,
    Self: 2
};

const TargetPriority = {
    LeastHealth: 0,
    CurrentTarget: 1,
    Random: 2
};

const ActionType = {
    Direct: 0,
    OverTimeEffect: 1,
    DirectAndOverTime: 2
};

class Action {

    constructor() {
        this.id = 0;
        this.name = '';
        this.icon = '';
        this.castTime = 0;
        this.power = 0;
        this.cooldown = 0;
        this.maxStacks = 1;
        this.duration = 0;
        this.actionType = ActionType.Direct;
        this.targetType = 0;
        this.targetPriority = 0;

        this.cooldownRemaining = 0;
        this.owner = null;
    }

    startCooldown() {
        this.cooldownRemaining = this.cooldown;
    }

    reduceCooldown(dt) {
        if (this.cooldownRemaining > 0) {
            this.cooldownRemaining -= dt;
            if (this.cooldownRemaining < 0)
                this.cooldownRemaining = 0;
        }
    }

    getBaseAction() {
        return {
            id: this.id,
            name: this.name,
            icon: this.icon,
            castTime: this.castTime,
            power: this.power,
            cooldown: this.cooldown,
            maxStacks: this.maxStacks,
            duration: this.duration,
            actionType: this.actionType,
            targetType: this.targetType,
            targetPriority: this.targetPriority
        }
    }
}

class OverTimeEffect {

    constructor(caster, action) {
        this.id = action.id;
        this.duration = action.duration;
        this.name = action.name;
        this.power = action.power;
        this.remainingDuration = this.duration;
        this.tickProgress = 0;
        this.stacks = 1;
        this.maxStacks = action.maxStacks;
        this.tickReady = false;
        this.caster = caster;
    }

    addStack() {
        this.stacks += 1;
        if (this.stacks > this.maxStacks)
            this.stacks = this.maxStacks;
        this.remainingDuration = this.duration;
    }

    resetDuration() {
        this.remainingDuration = this.duration;
    }

    reduceRemaningDuration(dt) {
        this.remainingDuration -= dt;
        if (this.remainingDuration < 0)
            this.remainingDuration = 0;

        this.tickProgress += dt;
        if (this.tickProgress >= 1) {
            this.tickProgress -= 1;
            this.tickReady = true;
        }
    }

}

module.exports = {
    Action: Action,
    OverTimeEffect: OverTimeEffect,
    ActionType: ActionType,
    TargetType: TargetType,
    TargetPriority: TargetPriority
};
