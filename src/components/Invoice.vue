<template>
  <router-link
    class="invoice flex"
    :to="{ name: 'Invoice', params: { invoiceId: invoice.invoiceId } }"
    :class="{ light: !darkMode }"
  >
    <div class="left flex">
      <span class="tracking-number"><span>#</span>{{ invoice.invoiceId }}</span>
      <span class="due-date">Due {{ invoice.paymentDueDate }}</span>
      <span class="person">{{ invoice.clientName }}</span>
      <span class="mobile-only price">$ {{ invoice.invoiceTotal }}</span>
    </div>
    <div class="right flex">
      <span class="price">$ {{ invoice.invoiceTotal }}</span>
      <span class="mobile-only person">{{ invoice.clientName }}</span>
      <div
        class="status-button flex"
        :class="{
          paid: invoice.invoicePaid,
          draft: invoice.invoiceDraft,
          pending: invoice.invoicePending,
        }"
      >
        <span v-if="invoice.invoicePaid"> Paid </span>
        <span v-if="invoice.invoiceDraft"> Draft </span>
        <span v-if="invoice.invoicePending"> Pending </span>
      </div>
      <div class="icon">
        <img src="@/assets/icon-arrow-right.svg" alt="" />
      </div>
    </div>
  </router-link>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "invoice",
  props: {
    invoice: Object,
  },
  computed: {
    ...mapState(["darkMode"]),
  },
};
</script>

<style lang='scss' scoped>
.invoice {
  text-decoration: none;
  cursor: pointer;
  gap: 16px;
  margin-bottom: 16px;
  color: #fff;
  border-radius: 20px;
  padding: 28px 32px;
  background-color: #1e2139;
  align-items: center;

  &.light {
    color: #141625;
    background-color: #fff;
    font-weight: 600;

    .status-button.draft {
      &::before {
        background-color: #141625;
      }
      color: #141625;
      background-color: rgba(223, 227, 250, 1);
    }
  }

  span {
    font-size: 13px;
  }

  .mobile-only {
    display: none;
  }

  .left {
    align-items: center;
    flex-basis: 60%;
    gap: 16px;

    span {
      flex: 1;
    }

    .tracking-number {
      text-transform: uppercase;

      span {
        color: #888eb0;
      }
    }

    @media (max-width: 500px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;

      span:first-child {
        margin-bottom: 16px;
        font-weight: 600;
      }

      .mobile-only.price {
        display: inline-block;
        font-weight: 600;
        font-size: 14px;
      }

      .person {
        display: none;
      }
    }
  }

  .right {
    gap: 16px;
    flex-basis: 40%;
    align-items: center;

    .price {
      flex: 1;
      font-size: 16px;
      font-weight: 600;
    }

    @media (max-width: 500px) {
      flex-direction: column;
      align-items: flex-end;

      .mobile-only.person {
        display: inline-block;
      }

      .price {
        display: none;
      }

      .status-button {
        margin-right: 0;
        padding: 10px 16px;
      }

      .icon {
        display: none;
      }
    }
  }
}
</style>