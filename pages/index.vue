<script lang="ts" setup>
const castRangeToNumber = (node: FormKitNode) => {
  // We add a check to add the cast only to range inputs
  if (node.props.type !== "range") return;

  node.hook.input((value, next) => next(Number(value)));
};

const createCharacter = async (fields: any) => {
  await new Promise((r) => setTimeout(r, 1000));
  alert(JSON.stringify(fields));
};
</script>

<template>
  <div class="mx-12">
    <h1 class="py-4 bg-red-800 dark:bg-green-800">New Character</h1>

    <!-- form is also an input, so it also accepts plugins -->
    <div class="py-4">
      <FormKit
        type="form"
        @submit="createCharacter"
        :plugins="[castRangeToNumber]"
        #default="{ value }"
      >
        <FormKit
          type="checkbox"
          label="Terms and Conditions"
          help="Do you agree to our terms of service?"
          name="terms"
          validation="accepted"
          validation-visibility="dirty"
        />

        <FormKit
          type="text"
          name="name"
          id="name"
          validation="required|not:Admin"
          label="Name"
          help="Enter your character's full name"
          placeholder="“Scarlet Sword”"
        />

        <FormKit
          type="select"
          label="Class"
          name="class"
          id="class"
          placeholder="Select a class"
          :options="['Warrior', 'Mage', 'Assassin']"
        />

        <FormKit
          type="range"
          name="strength"
          id="strength"
          label="Strength"
          value="5"
          validation="min:2|max:9"
          validation-visibility="live"
          min="1"
          max="10"
          step="1"
          help="How many strength points should this character have?"
        />

        <FormKit
          type="range"
          name="skill"
          id="skill"
          validation="required|max:10"
          label="Skill"
          value="5"
          min="1"
          max="10"
          step="1"
          help="How many skill points should this character have?"
        />

        <FormKit
          type="range"
          name="dexterity"
          id="dexterity"
          validation="required|max:10"
          label="Dexterity"
          value="5"
          min="1"
          max="10"
          step="1"
          help="How many dexterity points should this character have?"
        />

        <pre wrap>{{ value }}</pre>
      </FormKit>
    </div>

    <p>
      <em><small>Press submit to see the collected form data.</small></em>
    </p>
  </div>
</template>
