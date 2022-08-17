import SettlementProcessing from "@/views/calculate/SettlementProcessing.vue";
import compAPI from "@vue/composition-api";
test("Settlement Component", () => {
  let constructor = Vue.extend(SettlementProcessing);
  let vm = new constructor().$mount();
  let title = vm._data.title;
  expect(title).toBe("2022년 2월 정기 정산");
});
