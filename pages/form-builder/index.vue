<script lang="ts" setup>
import FormSchemaDebug from "./components/FormSchemaDebug.vue";
import { FormKitSchema } from "@formkit/vue";
import type { FormKitSchemaNode } from "@formkit/core";
import { ref } from "vue";
import FormCamposDoEntrevistado, {
  type campoEntrevistado,
} from "./components/FormCamposDoEntrevistado.vue";
import FormAdicionarCampoAoFormulario from "./components/FormAdicionarCampoAoFormulario.vue";

const schema = ref<FormKitSchemaNode[]>([]);

const data = ref({});

const addCampoDadoEntrevistado = (campo: FormKitSchemaNode, index: number) => {
  schema.value.splice(index, 0, campo);
};

const addPergunta = (campo: FormKitSchemaNode) => {
  console.log("!!!!!!!!");
  schema.value.push(campo);
};

const rmCampoDadoEntrevistado = (campo: campoEntrevistado) => {
  schema.value = schema.value.filter((input) => {
    if (typeof input === "object" && "name" in input) {
      return input.name !== campo;
    }

    return true;
  });
};

const handleSubmit = (x: Record<string, string>) => alert(JSON.stringify(x));
</script>

<template>
  <div class="p-6">
    <div class="flex space-x-6">
      <FormCamposDoEntrevistado
        @field-added="addCampoDadoEntrevistado"
        @field-removed="rmCampoDadoEntrevistado"
      />

      <FormAdicionarCampoAoFormulario @field-added="addPergunta" />
    </div>

    <div class="p-6 my-6 border-solid border-2 border-sky-500">
      <h3 class="mb-3 text-lg">Preview do formulário</h3>

      <FormKit type="form" v-model="data" @submit="handleSubmit">
        <FormKitSchema :schema="schema" :data="data" />
      </FormKit>
    </div>

    <FormSchemaDebug :schema="schema" :data="data" />
  </div>
</template>
