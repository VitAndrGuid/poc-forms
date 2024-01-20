<script lang="ts" setup>
import type { FormKitSchemaNode } from "@formkit/core";
import { ref } from "vue";

export type campoEntrevistado =
  | "nome"
  | "regiao"
  | "bairro"
  | "rua"
  | "numeroEndereco"
  | "celular"
  | "local"
  | "email";

type CampoComIndex = {
  field: FormKitSchemaNode;
  fieldIndex: number;
};

const inputsDadosEntrevistado: Record<campoEntrevistado, CampoComIndex> = [
  {
    $formkit: "text",
    name: "nome",
    label: "Nome Completo",
    validation: "required",
  },
  {
    $formkit: "text",
    name: "celular",
    label: "Celular",
    validation: "required",
  },
  {
    $formkit: "text",
    name: "email",
    label: "Email",
    validation: "required",
  },
  {
    $formkit: "text",
    name: "local",
    label: "Local",
    validation: "required",
  },
  {
    $formkit: "text",
    name: "regiao",
    label: "Região",
    validation: "required",
  },
  {
    $formkit: "text",
    name: "bairro",
    label: "Bairro",
    validation: "required",
  },
  {
    $formkit: "text",
    name: "rua",
    label: "Rua",
    validation: "required",
  },
  {
    $formkit: "text",
    name: "numeroEndereco",
    label: "Numero",
    validation: "required",
  },
].reduce(
  (acc, field, i) => ({
    ...acc,
    [field.name]: { field, fieldIndex: i },
  }),
  {} as Record<campoEntrevistado, CampoComIndex>
);

const toggleCampoEntrevistado = (v: boolean, campo: campoEntrevistado) => {
  const { field, fieldIndex } = inputsDadosEntrevistado[campo];

  if (campo === "regiao" && !v) {
    getNode("bairro")?.input(false);
    getNode("rua")?.input(false);
    getNode("numeroEndereco")?.input(false);
  }

  if (campo === "bairro" && !v) {
    getNode("rua")?.input(false);
    getNode("numeroEndereco")?.input(false);
  }

  if (campo === "rua" && !v) {
    getNode("numeroEndereco")?.input(false);
  }

  if (v) emit("fieldAdded", field, fieldIndex);
  else emit("fieldRemoved", campo);
};

type CamposSelecionados = Record<campoEntrevistado, boolean>;

const campos = ref<CamposSelecionados>({
  rua: false,
  nome: false,
  email: false,
  local: false,
  bairro: false,
  regiao: false,
  celular: false,
  numeroEndereco: false,
});

const emit = defineEmits<{
  fieldAdded: [field: FormKitSchemaNode, index: number];
  fieldRemoved: [name: campoEntrevistado];
}>();
</script>

<template>
  <div class="p-6 border-solid border-2 border-green-500 w-full">
    <h2 class="mb-3 text-lg">Dados do Entrevistado</h2>

    <FormKit
      v-model="campos"
      type="form"
      :actions="false"
      #default="{ value: campos }"
    >
      <FormKit
        type="checkbox"
        label="Nome"
        name="nome"
        decorator-icon="check"
        @input="(v) => toggleCampoEntrevistado(v ?? false, 'nome')"
      />

      <FormKit
        type="checkbox"
        label="Celular"
        name="celular"
        decorator-icon="check"
        @input="(v) => toggleCampoEntrevistado(v ?? false, 'celular')"
      />

      <FormKit
        type="checkbox"
        label="Email"
        name="email"
        decorator-icon="check"
        @input="(v) => toggleCampoEntrevistado(v ?? false, 'email')"
      />

      <FormKit
        type="checkbox"
        label="Local"
        name="local"
        decorator-icon="check"
        @input="(v) => toggleCampoEntrevistado(v ?? false, 'local')"
      />

      <FormKit
        type="checkbox"
        label="Regiao"
        name="regiao"
        decorator-icon="check"
        @input="(v) => toggleCampoEntrevistado(v ?? false, 'regiao')"
      />

      <FormKit
        id="bairro"
        type="checkbox"
        label="Bairro"
        name="bairro"
        decorator-icon="check"
        :disabled="!campos || !campos['regiao']"
        @input="(v) => toggleCampoEntrevistado(v ?? false, 'bairro')"
      />

      <FormKit
        id="rua"
        type="checkbox"
        label="Rua"
        name="rua"
        decorator-icon="check"
        :disabled="!campos || !campos['bairro']"
        @input="(v) => toggleCampoEntrevistado(v ?? false, 'rua')"
      />

      <FormKit
        id="numeroEndereco"
        type="checkbox"
        label="Numero"
        name="numeroEndereco"
        decorator-icon="check"
        :disabled="!campos || !campos['rua']"
        @input="(v) => toggleCampoEntrevistado(v ?? false, 'numeroEndereco')"
      />
    </FormKit>
  </div>
</template>

<style scoped>
.formkit-outer {
  margin-bottom: 10px;
}
</style>
