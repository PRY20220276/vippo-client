<template>
  <v-container fluid>
    <v-breadcrumbs :items="['Foo', 'Bar', 'Fizz']"></v-breadcrumbs>
    <div class="ml-4 text-h4 text-primary">Playground</div>
    <v-row class="mt-5">
      <v-col v-for="n in 6" :key="n" cols="12" sm="4">
        <!-- Test out components here -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PlaygroundPage",
  data: () => ({}),
};
</script>
