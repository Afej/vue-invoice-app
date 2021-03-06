<template>
  <div
    class="container invoice-view"
    v-if="currentInvoice"
    :class="{ light: !darkMode }"
  >
    <router-link class="nav-link flex" :to="{ name: 'Home' }">
      <img src="@/assets/icon-arrow-left.svg" alt="back icon" />
      Go Back
    </router-link>

    <!-- header -->
    <div class="header flex">
      <div class="left flex">
        <span>Status</span>
        <div
          class="status-button flex"
          :class="{
            paid: currentInvoice.invoicePaid,
            draft: currentInvoice.invoiceDraft,
            pending: currentInvoice.invoicePending,
          }"
        >
          <span v-if="currentInvoice.invoicePaid"> Paid </span>
          <span v-if="currentInvoice.invoiceDraft"> Draft </span>
          <span v-if="currentInvoice.invoicePending"> Pending </span>
        </div>
      </div>
      <div class="right flex">
        <button class="dark-purple" @click="toggleEditInvoice">Edit</button>
        <button class="red" @click="toggleDeleteModal(currentInvoice.docId)">
          Delete
        </button>
        <button
          v-show="currentInvoice.invoicePending"
          class="green"
          @click="updateStatusToPaid(currentInvoice.docId)"
        >
          Mark as Paid
        </button>
        <button
          v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid"
          class="orange"
          @click="updateStatusToPending(currentInvoice.docId)"
        >
          Mark as Pending
        </button>
      </div>
    </div>

    <div v-if="loading">
      <Loading />
    </div>

    <!-- invoice details -->
    <div class="flex invoice-details flex-column">
      <div class="top flex">
        <div class="left flex flex-column">
          <p><span>#</span>{{ currentInvoice.invoiceId }}</p>
          <p>{{ currentInvoice.productDescription }}</p>
        </div>
        <div class="right flex flex-column">
          <p>{{ currentInvoice.billerStreetAddress }}</p>
          <p>{{ currentInvoice.billerCity }}</p>
          <p>{{ currentInvoice.billerZipCode }}</p>
          <p>{{ currentInvoice.billerCountry }}</p>
        </div>
      </div>

      <div class="middle flex">
        <div class="payment flex flex-column">
          <h4>Invoice Date</h4>
          <p>{{ currentInvoice.invoiceDate }}</p>
          <h4>Payment Date</h4>
          <p>{{ currentInvoice.paymentDueDate }}</p>
        </div>

        <div class="bill flex flex-column">
          <h4>Bill to</h4>
          <p>{{ currentInvoice.clientName }}</p>
          <p>{{ currentInvoice.clientStreetAddress }}</p>
          <p>{{ currentInvoice.clientCity }}</p>
          <p>{{ currentInvoice.clientZipCode }}</p>
          <p>{{ currentInvoice.clientCountry }}</p>
        </div>

        <div class="send-to flex flex-column">
          <h4>Sent To</h4>
          <p>{{ currentInvoice.clientEmail }}</p>
        </div>
      </div>

      <div class="bottom flex flex-column">
        <div class="billing-items">
          <div class="heading flex">
            <p>Item Name</p>
            <p>QTY</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          <div
            v-for="(item, index) in currentInvoice.invoiceItemList"
            :key="index"
            class="item flex"
          >
            <p>{{ item.itemName }}</p>
            <p>{{ item.qty }}</p>
            <p>${{ item.price }}</p>
            <p>${{ item.total }}</p>
          </div>
        </div>

        <!-- mobile layout -->
        <div class="mobile-only billing-items">
          <div
            v-for="(item, index) in currentInvoice.invoiceItemList"
            :key="index"
            class="item flex"
          >
            <div class="left">
              <p>{{ item.itemName }}</p>
              <p>$ {{ item.qty }} x {{ item.price }}</p>
            </div>
            <div class="right">
              <p>$ {{ item.total }}</p>
            </div>
          </div>
        </div>

        <div class="mobile-only total flex">
          <p>Grand Total</p>
          <p>$ {{ currentInvoice.invoiceTotal }}</p>
        </div>
        <!-- end of mobile layout -->

        <div class="total flex">
          <p>Amount Due</p>
          <p>$ {{ currentInvoice.invoiceTotal }}</p>
        </div>
      </div>
    </div>

    <!-- mobile buttons -->
    <div class="mobile-only buttons">
      <button
        class="dark-purple"
        @click="toggleEditInvoice(currentInvoice.docId)"
      >
        Edit
      </button>
      <button class="red" @click="toggleDeleteModal(currentInvoice.docId)">
        Delete
      </button>
      <button
        v-show="currentInvoice.invoicePending"
        class="green"
        @click="updateStatusToPaid(currentInvoice.docId)"
      >
        Mark as Paid
      </button>
      <button
        v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid"
        class="orange"
        @click="updateStatusToPending(currentInvoice.docId)"
      >
        Mark as Pending
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import Loading from "@/components/Loading";

export default {
  name: "invoiceView",
  components: {
    Loading,
  },
  data() {
    return {
      currentInvoice: null,
    };
  },
  created() {
    this.getCurrentInvoice();
  },
  methods: {
    ...mapMutations([
      "SET_CURRENT_INVOICE",
      "TOGGLE_EDIT_INVOICE",
      "TOGGLE_INVOICE",
      "TOGGLE_DELETE_MODAL",
    ]),

    ...mapActions([
      "DELETE_INVOICE",
      "UPDATE_STATUS_TO_PAID",
      "UPDATE_STATUS_TO_PENDING",
    ]),

    getCurrentInvoice() {
      this.SET_CURRENT_INVOICE(this.$route.params.invoiceId);
      this.currentInvoice = this.currentInvoiceArray[0];
    },
    toggleEditInvoice() {
      this.TOGGLE_EDIT_INVOICE();
      this.TOGGLE_INVOICE();
    },
    toggleDeleteModal(docId) {
      this.TOGGLE_DELETE_MODAL(docId);
    },
    updateStatusToPaid(docId) {
      this.UPDATE_STATUS_TO_PAID(docId);
    },
    updateStatusToPending(docId) {
      this.UPDATE_STATUS_TO_PENDING(docId);
    },
  },
  computed: {
    ...mapState(["currentInvoiceArray", "editInvoice", "loading", "darkMode"]),
  },
  watch: {
    editInvoice() {
      if (!this.editInvoice) {
        this.currentInvoice = this.currentInvoiceArray[0];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.invoice-view {
  // light mode styling
  &.light {
    font-weight: 600;

    .nav-link {
      color: #141625;
    }

    .header,
    .invoice-details {
      background-color: #fff;
    }

    .header {
      .left span {
        color: #141625;
      }
    }

    .invoice-details {
      div {
        color: #141625;
      }

      .top {
        div {
          color: #141625;
        }

        .left {
          p:first-child {
            color: #141625;
          }
        }
      }

      .middle h4 {
        font-weight: 600;
      }

      .bottom .billing-items {
        background-color: #F0F1F2;

        .heading,
        .item {
          color: #141625;
        }
      }
    }
  }

  .nav-link {
    margin-bottom: 32px;
    align-items: center;
    color: #fff;
    font-size: 12px;
    img {
      margin-right: 16px;
      width: 7px;
      height: 10px;
    }
  }

  .header,
  .invoice-details {
    background-color: #1e2139;
    border-radius: 20px;
  }

  .header {
    align-items: center;
    padding: 24px 32px;
    font-size: 12px;

    .left {
      align-items: center;

      span {
        color: #dfe3fa;
        margin-right: 16px;
      }
    }

    .right {
      flex: 1;
      justify-content: flex-end;

      button {
        color: white;
      }
    }

    @media (max-width: 500px) {
      .left {
        justify-content: space-between;
        flex: 1;

        div {
          margin-right: 0;
        }
      }

      .right {
        display: none;
      }
    }
  }

  .invoice-details {
    padding: 48px;
    margin-top: 24px;

    .top {
      div {
        color: #dfe3fa;
        flex: 1;
      }

      .left {
        font-size: 12px;

        p:first-child {
          font-size: 24px;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 8px;
        }

        p:nth-child(2) {
          font-size: 16px;
        }

        span {
          color: #888eb0;
        }
      }

      .right {
        font-size: 12px;
        align-items: flex-end;
      }

      @media (max-width: 500px) {
        flex-direction: column;

        .left > p:first-child {
          margin-bottom: 0px;
        }

        .right {
          align-items: flex-start;
          margin-top: 24px;
        }
      }
    }

    .middle {
      margin-top: 50px;
      color: #dfe3fa;
      gap: 16px;

      @media (max-width: 500px) {
        flex-wrap: wrap;
      }

      h4 {
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 12px;
      }

      p {
        font-size: 16px;
      }

      .bill,
      .payment {
        flex: 1;

        @media (max-width: 500px) {
          h4 {
            margin-bottom: 0;
          }
        }
      }

      .payment {
        h4:nth-child(3) {
          margin-top: 32px;
        }

        p {
          font-weight: 600;
        }
      }

      .bill {
        p:nth-child(2) {
          font-size: 16px;
        }
        p:nth-child(3) {
          margin-top: auto;
        }

        p {
          font-size: 12px;

          @media (max-width: 500px) {
            font-size: 10px;
          }
        }
      }

      .send-to {
        flex: 2;

        @media (max-width: 500px) {
          margin-top: 12px;
          h4 {
            margin-bottom: 0;
          }
        }
      }
    }

    .bottom {
      margin-top: 50px;

      .mobile-only {
        display: none;
      }

      .billing-items {
        padding: 32px;
        border-radius: 20px 20px 0 0;
        background-color: #252946;

        .heading {
          color: #dfe3fa;
          font-size: 12px;
          margin-bottom: 32px;

          p:first-child {
            flex: 3;
            text-align: left;
          }

          p {
            flex: 1;
            text-align: right;
          }
        }

        .item {
          margin-bottom: 32px;
          font-size: 13px;
          color: #fff;

          &:last-child {
            margin-bottom: 0;
          }

          p:first-child {
            flex: 3;
            text-align: left;
          }

          p {
            flex: 1;
            text-align: right;
          }
        }
      }

      .total {
        color: #fff;
        padding: 32px;
        background-color: #0b0e15;
        align-items: center;
        border-radius: 0 0 20px 20px;

        p {
          flex: 1;
          font-size: 12px;
        }

        p:nth-child(2) {
          font-size: 28px;
          text-align: right;
        }
      }

      @media (max-width: 500px) {
        .billing-items,
        .total {
          display: none;
        }

        .mobile-only.total {
          display: flex;
        }

        .mobile-only.billing-items {
          display: block;

          .item {
            justify-content: space-between;
            align-items: center;

            .left {
              p:first-child {
                font-weight: 600;
                font-size: 16px;
                text-transform: capitalize;
              }
            }
          }
        }
      }
    }

    @media (max-width: 500px) {
      padding: 24px;
    }
  }

  .mobile-only.buttons {
    display: none;

    @media (max-width: 500px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #1e2139;
      border-radius: 20px;
      padding: 24px;

      margin-top: 24px;

      button {
        padding: 10px 15px;
      }
    }
  }
}
</style>