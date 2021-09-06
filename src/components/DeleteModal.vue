<template>
  <div class="modal flex">
    <div class="modal-content">
      <p>Are you sure you want to delete this invoice?</p>
      <div class="actions flex">
        <button @click="closeModal" class="purple">Back</button>
        <button @click="deleteInvoice" class="red">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "deleteModal",
  methods: {
    ...mapMutations(["TOGGLE_DELETE_MODAL"]),
    ...mapActions(["DELETE_INVOICE"]),
    closeModal() {
      this.TOGGLE_DELETE_MODAL(null);
    },
    async deleteInvoice() {
      await this.DELETE_INVOICE(this.currentInvoiceDocId);
      this.TOGGLE_DELETE_MODAL(null);
      this.$router.push({ name: "Home" });
    },
  },
  computed: {
    ...mapState(["loading", "currentInvoiceDocId"]),
  },
};
</script>

<style lang="scss" scoped>
.modal {
  z-index: 100;
  position: fixed;
  left: 0;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  @media (max-width: 500px) {
  }

  .modal-content {
    border-radius: 20px;
    padding: 48px 32px;
    max-width: 450px;
    background-color: #252945;
    color: #fff;

    @media (max-width: 500px) {
      max-width: 80vw;
    }

    p {
      text-align: center;
    }
    .actions {
      margin-top: 24px;
      button {
        flex: 1;
      }
    }
  }
}
</style>