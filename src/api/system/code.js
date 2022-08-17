import { createInstanceWithAuth } from "../index";
function getCode(id) {
  return createInstanceWithAuth(`/syscode/parents/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function getCodeDetail(id) {
  return createInstanceWithAuth(`/syscode/detail/${id}`, {}, {}, "application/json; charset=utf-8").get();
}

export { getCode, getCodeDetail };
