import { Story } from "inkjs";

export interface StoryState {
  text: string[];
  choices: Array<{ index: number; text: string }>;
  tags: string[];
  canContinue: boolean;
}

export function loadStory(inkJson: string): Story {
  return new Story(inkJson);
}

export function getStoryState(story: Story): StoryState {
  const text: string[] = [];
  while (story.canContinue) {
    const line = story.Continue();
    if (line) text.push(line.trim());
  }
  return {
    text,
    choices: story.currentChoices.map((c, i) => ({ index: i, text: c.text })),
    tags: story.currentTags || [],
    canContinue: story.canContinue,
  };
}

export function makeChoice(story: Story, choiceIndex: number): StoryState {
  story.ChooseChoiceIndex(choiceIndex);
  return getStoryState(story);
}
