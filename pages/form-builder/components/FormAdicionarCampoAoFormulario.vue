<script lang="ts" setup>
import type { FormKitSchemaNode } from "@formkit/core";
import { ref } from "vue";

const formCampoDefaultValues = () => ({
  titulo: "",
  tipo: "aberta",
  obrigatorio: false,
  opcoes: [""],
});

const campo = ref(formCampoDefaultValues());

const emit = defineEmits<{ fieldAdded: [field: FormKitSchemaNode] }>();

const submit = () => {
  const { tipo, titulo, obrigatorio, opcoes } = campo.value;

  const isMultiplaEscolha = tipo === "escolha";

  const field: FormKitSchemaNode = {
    $formkit: isMultiplaEscolha ? "select" : "text",
    name: "exemplo",
    label: titulo,
  };

  if (obrigatorio) field["validation"] = "required";
  if (isMultiplaEscolha) field["options"] = opcoes;

  emit("fieldAdded", field);

  reset("formCriacaoCampo", formCampoDefaultValues());

  // gambiarra, devido a algum comportamento que não consegui identificar ao resetar o formulario
  // as opções são setadas para um array com o um total numero de elementos nulos igual ao numero
  // de opções prévias
  nextTick(() => {
    campo.value.opcoes = [""];
  });
};
</script>

<template>
  <div class="p-6 border-solid border-2 border-purple-500 w-full">
    <h2 class="mb-3 text-lg">Adicionar pergunta:</h2>

    <FormKit id="formCriacaoCampo" v-model="campo" type="form" @submit="submit">
      <FormKit type="text" label="Título" name="titulo" validation="required" />

      <FormKit
        type="checkbox"
        label="Obrigatório ?"
        name="obrigatorio"
        decorator-icon="check"
        validation="required"
      />

      <FormKit
        type="radio"
        name="tipo"
        label="Tipo de pergunta"
        :options="{ escolha: 'Múltipla Escolha', aberta: 'Aberta' }"
        decorator-icon="check"
        validation="required"
      />

      <div v-if="campo && campo.tipo === 'escolha'">
        <p class="mb-2">Opções</p>

        <div v-for="(_, i) in campo.opcoes">
          <FormKit v-model="campo.opcoes[i]" type="text" validation="required">
            <template #label>
              <div class="flex items-center mb-2 w-full">
                <span class="h-full mr-auto">opção: {{ i + 1 }}</span>

                <button
                  type="button"
                  class="bg-green-200 p-2 my-auto mr-4 rounded-md text-sm"
                  @click="() => campo.opcoes.push('')"
                >
                  add
                </button>

                <button
                  :disabled="campo.opcoes.length <= 1"
                  type="button"
                  class="bg-red-200 p-2 my-auto rounded-md text-sm"
                  @click="() => campo.opcoes.splice(i, 1)"
                >
                  rm
                </button>
              </div>
            </template>
          </FormKit>
        </div>
      </div>
    </FormKit>
  </div>
</template>
