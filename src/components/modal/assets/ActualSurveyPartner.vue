<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>에이전트 고객/실측 등록</h2>
    </template>
    <template slot="body">
      <div class="v-application">
        <section class="init-wrap section-box border-outside">
          <div class="border">
            <div class="header">
              <h3>에이전트 고객/실측 정보</h3>
              <div v-if="actualSurveyPartnerStatus === 'SYS21819B004' || actualSurveyPartnerStatus === 'SYS21827B001'">
                <v-btn small color="warning ml5 mr5" @click="modify">수정</v-btn>
                <v-btn small color="primary" @click="customer">잠재고객처리</v-btn>
                <v-btn small color="error ml5 mr5" @click="cancel">반려</v-btn>
              </div>
              <div v-if="actualSurveyPartnerStatus === 'SYS21819B006'">
                <v-btn small color="primary ml5 mr5" @click="rejectCancel">반려 취소</v-btn>
              </div>
            </div>
            <table width="100%" class="tbl-reg column2">
              <colgroup>
                <col width="120" />
                <col width="*" />
                <col width="120" />
                <col width="*" />
                <col width="120" />
                <col width="*" />
                <col width="120" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>고유 코드</td>
                <td><input type="text" readonly v-model="actualSurveyPartnerSid" /></td>
                <td>업체</td>
                <td><input type="text" readonly v-model="company" /></td>
                <td>업체담당자</td>
                <td><input type="text" readonly v-model="name" /></td>
                <td>유치 등록 날짜</td>
                <td><input type="text" readonly v-model="actualSurveyPartnerDate" /></td>
              </tr>
              <tr>
                <td>상담일</td>
                <td>
                  <input v-if="onlyRead" type="text" v-model="actualSurveyPartnerUserDate" :readonly="onlyRead" />
                  <date-picker
                    v-else
                    :propdate="actualSurveyPartnerUserDate"
                    @updateDate="actualSurveyPartnerUserDateProp"
                    :readOnly="onlyRead"
                  ></date-picker>
                </td>
                <td>고객 이름</td>
                <td><input type="text" v-model="actualSurveyPartnerUserName" :readonly="onlyRead" /></td>
                <td>고객명(회사명)</td>
                <td><input type="text" v-model="actualSurveyPartnerUserCompanyName" :readonly="onlyRead" /></td>
                <td>고객 이메일 주소</td>
                <td><input type="text" v-model="actualSurveyPartnerUserEmail" :readonly="onlyRead" /></td>
              </tr>
              <tr>
                <td>고객 연락처</td>
                <td><input type="text" v-model="actualSurveyPartnerUserHp" :readonly="onlyRead" /></td>
                <td>고객 설치 희망일</td>
                <td>
                  <input v-if="onlyRead" type="text" v-model="actualSurveyPartnerInstallDate" :readonly="onlyRead" />
                  <date-picker
                    v-else
                    :propdate="actualSurveyPartnerInstallDate"
                    @updateDate="actualSurveyPartnerInstallDateProp"
                    :readOnly="onlyRead"
                  ></date-picker>
                </td>
                <td>매장 임대잔여기간(개월)</td>
                <td><input type="text" v-model="actualSurveyPartnerLeasePeriod" :readonly="onlyRead" /></td>
                <td>실측/설치 가능 시간</td>
                <td><input type="text" v-model="actualSurveyPartnerInstallTime" :readonly="onlyRead" /></td>
              </tr>
              <tr>
                <td>우편번호</td>
                <td colspan="7">
                  <input type="text" v-model="actualSurveyPartnerZipCode" class="zip zip-status" readonly />
                  <v-btn small color="primary" dark :disabled="onlyRead" @click="showAddressModalPopup()" class="ml5">검색</v-btn>
                </td>
              </tr>
              <tr>
                <td>주소</td>
                <td colspan="7"><input type="text" v-model="actualSurveyPartnerUserAddress1" readonly class="zip-status" /></td>
              </tr>
              <tr>
                <td>상세 주소</td>
                <td colspan="7"><input type="text" v-model="actualSurveyPartnerUserAddress2" :readonly="onlyRead" /></td>
              </tr>
              <tr>
                <td>상권 등급</td>
                <td>
                  <input v-if="onlyRead" type="text" v-model="actualSurveyPartnerAnalyzeVolumeName" :readonly="onlyRead" />
                  <pull-down
                    v-else
                    :onlyRead="onlyRead"
                    :data="actualSurveyPartnerAnalyzeVolume"
                    :code="storeCode"
                    @selected="selectStoreLevel"
                    class="pull-down"
                  ></pull-down>
                </td>
                <td>입지 분석 등급</td>
                <td>
                  <input v-if="onlyRead" type="text" v-model="actualSurveyPartnerAnalyzeLocationName" :readonly="onlyRead" />
                  <pull-down
                    v-else
                    :onlyRead="onlyRead"
                    :data="actualSurveyPartnerAnalyzeLocation"
                    :code="locationCode"
                    @selected="selectLocation"
                    class="pull-down"
                  ></pull-down>
                </td>
                <td>트래픽</td>
                <td><input type="number" v-model="actualSurveyPartnerFloatingPopulation" placeholder="숫자만 입력 가능" :readonly="onlyRead" /></td>
                <td>상품명</td>
                <td>
                  <input v-if="onlyRead" type="text" v-model="actualSurveyPartnerProductName" :readonly="onlyRead" />
                  <pull-down
                    v-else
                    :onlyRead="onlyRead"
                    :data="actualSurveyPartnerProduct"
                    :code="productCode"
                    @selected="selectProduct"
                    class="pull-down"
                  ></pull-down>
                </td>
              </tr>
              <tr>
                <td>유리형태</td>
                <td>
                  <input v-if="onlyRead" type="text" v-model="actualSurveyPartnerGlassTypeName" :readonly="onlyRead" />
                  <pull-down
                    v-else
                    :onlyRead="onlyRead"
                    :data="actualSurveyPartnerGlassType"
                    :code="glassCode"
                    @selected="selectGlass"
                    class="pull-down"
                  ></pull-down>
                </td>
                <td>
                  영상 조사 위치 /<br />
                  영상설치환경
                </td>
                <td>
                  <input v-if="onlyRead" type="text" v-model="actualSurveyPartnerVideoPreferenciasName" :readonly="onlyRead" />
                  <pull-down
                    v-else
                    :onlyRead="onlyRead"
                    :data="actualSurveyPartnerVideoPreferencias"
                    :code="movPositionCode"
                    @selected="selectPosition"
                    class="pull-down"
                  ></pull-down>
                </td>
                <td>트래픽센서 설치 위치</td>
                <td>
                  <input type="text" v-model="actualSurveyPartnerTrafficSensorPosition" :readonly="onlyRead" />
                </td>
                <td>특수시공</td>
                <td>
                  <input v-if="onlyRead" type="text" v-model="actualSurveyPartnerSpecialConstructionName" :readonly="onlyRead" />
                  <pull-down
                    v-else
                    :onlyRead="onlyRead"
                    :data="actualSurveyPartnerSpecialConstruction"
                    :code="specialCode"
                    @selected="selectSpecial"
                    class="pull-down"
                  ></pull-down>
                </td>
              </tr>
              <tr>
                <td>필름 전체크기(가로*세로)</td>
                <td>
                  <input type="text" v-model="actualSurveyPartnerFilmSize" :readonly="onlyRead" />
                </td>
                <td>실내 조도</td>
                <td><input type="text" v-model="actualSurveyPartnerIntensityIlluminationIn" :readonly="onlyRead" /></td>
                <td>실외 조도</td>
                <td><input type="text" v-model="actualSurveyPartnerIntensityIlluminationOut" :readonly="onlyRead" /></td>
                <td>선팅지 시공여부</td>
                <td>
                  <input v-if="onlyRead" type="text" v-model="actualSurveyPartnerWindowTintingEqupName" :readonly="onlyRead" />
                  <pull-down
                    v-else
                    :onlyRead="onlyRead"
                    :data="actualSurveyPartnerWindowTintingEqup"
                    :code="tintingCode"
                    @selected="selectTinting"
                    class="pull-down"
                  ></pull-down>
                </td>
              </tr>
              <tr>
                <td>
                  영상보유 유무 /<br />
                  매장 자체영상보유여부
                </td>
                <td>
                  <input v-if="onlyRead" type="text" v-model="actualSurveyPartnerVideoFormalName" :readonly="onlyRead" />
                  <pull-down
                    v-else
                    :onlyRead="onlyRead"
                    :data="actualSurveyPartnerVideoFormal"
                    :code="haveCode"
                    @selected="selectHave"
                    class="pull-down"
                  ></pull-down>
                </td>
                <td>구동방식</td>
                <td>
                  <input v-if="onlyRead" type="text" v-model="actualSurveyPartnerDrivingTypeName" :readonly="onlyRead" />
                  <pull-down
                    v-else
                    :onlyRead="onlyRead"
                    :data="actualSurveyPartnerDrivingType"
                    :code="actionCode"
                    @selected="actionHave"
                    class="pull-down"
                  ></pull-down>
                </td>
                <td>천고</td>
                <td>
                  <input type="text" v-model="actualSurveyPartnerCeilingHeight" placeholder="단위: mm" :readonly="onlyRead" />
                </td>
                <td>상태</td>
                <td>
                  <input type="text" readonly v-model="actualSurveyPartnerStatusName" />
                </td>
              </tr>
              <tr>
                <td>
                  투사확보거리 /<br />
                  투사거리
                </td>
                <td colspan="3">
                  <div class="textfield pt3">
                    <v-radio-group v-model="actualSurveyPartnerProjectionDistance" :readonly="onlyRead" column>
                      <v-radio label="2,000이상(60인치)" color="primary" value="2,000이상(60인치)"></v-radio>
                      <v-radio label="2,400이상(70인치)" color="primary" value="2,400이상(70인치)"></v-radio>
                      <v-radio label="3,500이상(100인치)" color="primary" value="3,500이상(100인치)"></v-radio>
                      <v-radio label="4,000이상" color="primary" value="4,000이상"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
                <td>천정소재</td>
                <td colspan="3">
                  <div class="textfield pt3 d-flex align-center">
                    <v-radio-group v-model="actualSurveyPartnerCeilingType" :readonly="onlyRead" column>
                      <v-radio label="석고보드" color="primary" value="석고보드"></v-radio>
                      <v-radio label="텍스형" color="primary" value="텍스형"></v-radio>
                      <v-radio label="노출형" color="primary" value="노출형"></v-radio>
                      <v-radio label="기타" color="primary" value="기타"></v-radio>
                    </v-radio-group>
                    <span v-if="actualSurveyPartnerCeilingType === '기타'" class="etc">
                      <input type="text" v-model="actualSurveyPartnerCeilingTypeEtc" placeholder="기타 내용을 넣어주세요." :readonly="onlyRead" />
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>예상 설치 사이즈 / <br />영상투사면적</td>
                <td colspan="3">
                  <div class="textfield pt3">
                    <v-radio-group v-model="actualSurveyPartnerVideoProjectionArea" column class="mt3" :readonly="onlyRead">
                      <v-radio label="60인치" color="primary" value="60인치"></v-radio>
                      <v-radio label="70인치" color="primary" value="70인치"></v-radio>
                      <v-radio label="80인치 이상" color="primary" value="80인치 이상"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
                <td>방위</td>
                <td colspan="3">
                  <div class="textfield pt3">
                    <v-radio-group v-model="actualSurveyPartnerCardinalPoints" :readonly="onlyRead" column>
                      <v-radio label="동" color="primary" value="동"></v-radio>
                      <v-radio label="동북" color="primary" value="동북"></v-radio>
                      <v-radio label="북" color="primary" value="북"></v-radio>
                      <v-radio label="북서" color="primary" value="북서"></v-radio>
                      <v-radio label="서" color="primary" value="서"></v-radio>
                      <v-radio label="서남" color="primary" value="서남"></v-radio>
                      <v-radio label="남" color="primary" value="남"></v-radio>
                      <v-radio label="남동" color="primary" value="남동"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
              </tr>
              <tr>
                <td>투사거리 내 타 광원</td>
                <td colspan="3">
                  <div class="textfield pt3">
                    <v-radio-group v-model="actualSurveyPartnerLightSource" :readonly="onlyRead" column>
                      <v-radio label="있음 (사진 필수 첨부)" color="primary" value="있음"></v-radio>
                      <v-radio label="없음" color="primary" value="없음"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
                <td>유리표면 상태</td>
                <td colspan="3">
                  <div class="textfield pt3">
                    <v-radio-group v-model="actualSurveyPartnerGlassSurface" :readonly="onlyRead" column>
                      <v-radio label="전면 선팅지 부착" color="primary" value="전면 선팅지 부착"></v-radio>
                      <v-radio label="시트지 부착" color="primary" value="시트지 부착"></v-radio>
                      <v-radio label="컬러유리" color="primary" value="컬러유리"></v-radio>
                      <v-radio label="양호" color="primary" value="양호"></v-radio>
                      <v-radio label="기타" color="primary" value="기타"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
              </tr>
              <tr>
                <td>프로젝터 설치방식</td>
                <td colspan="3">
                  <div class="textfield pt3">
                    <v-radio-group v-model="actualSurveyPartnerProjectEqupType" :readonly="onlyRead" column>
                      <v-radio label="가로형(기본)" color="primary" value="가로형(기본)"></v-radio>
                      <v-radio label="세로형" color="primary" value="세로형"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
                <td>고객 협의 유무</td>
                <td colspan="3">
                  <div class="textfield pt3">
                    <div class="check-group">
                      <v-checkbox
                        v-model="actualSurveyPartnerPartnerConsultation"
                        label="유리면 시트지 제거"
                        value="유리면 시트지 제거"
                        :readonly="onlyRead"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="actualSurveyPartnerPartnerConsultation"
                        label="유리 주위 조명 제거"
                        value="유리 주위 조명 제거"
                        :readonly="onlyRead"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="actualSurveyPartnerPartnerConsultation"
                        label="유리 주위 기물 이동"
                        value="유리 주위 기물 이동"
                        :readonly="onlyRead"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="actualSurveyPartnerPartnerConsultation"
                        label="기타 협의 사항"
                        value="기타 협의 사항"
                        :readonly="onlyRead"
                      ></v-checkbox>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>프로젝터 브라켓 방식</td>
                <td colspan="3">
                  <div class="textfield pt3">
                    <v-radio-group v-model="actualSurveyPartnerProjectBracketType" :readonly="onlyRead" column>
                      <v-radio label="기본 브라켓" color="primary" value="기본 브라켓"></v-radio>
                      <v-radio label="봉 브라켓" color="primary" value="봉 브라켓"></v-radio>
                      <v-radio label="엘리베이션" color="primary" value="엘리베이션"></v-radio>
                      <v-radio label="기타" color="primary" value="기타"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
                <td>콘트롤러 위치</td>
                <td colspan="3">
                  <div class="textfield pt3">
                    <v-radio-group v-model="actualSurveyPartnerControllerPosition" :readonly="onlyRead" column>
                      <v-radio label="천장 점검구" color="primary" value="천장 점검구"></v-radio>
                      <v-radio label="외부 노출" color="primary" value="외부 노출"></v-radio>
                      <v-radio label="기타" color="primary" value="기타"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
              </tr>
              <tr>
                <td>단자 방향</td>
                <td colspan="3">
                  <div class="textfield pt3">
                    <v-radio-group v-model="actualSurveyPartnerOrderFilmTerminal" :readonly="onlyRead" column>
                      <v-radio label="상단자" color="primary" value="상단자"></v-radio>
                      <v-radio label="측면단자" color="primary" value="측면단자"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
                <td>실측일 날씨</td>
                <td colspan="3">
                  <div class="textfield pt3">
                    <v-radio-group v-model="actualSurveyPartnerWeather" :readonly="onlyRead" column>
                      <v-radio label="맑음" color="primary" value="맑음"></v-radio>
                      <v-radio label="흐림" color="primary" value="흐림"></v-radio>
                      <v-radio label="눈" color="primary" value="눈"></v-radio>
                      <v-radio label="비" color="primary" value="비"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
              </tr>
              <tr>
                <td>실리콘 컬러</td>
                <td colspan="7">
                  <div class="textfield pt3 d-flex">
                    <v-radio-group v-model="actualSurveyPartnerSilliconColor" :readonly="onlyRead" column>
                      <v-radio label="검정색" color="primary" value="검정색"></v-radio>
                      <v-radio label="회색" color="primary" value="회색"></v-radio>
                      <v-radio label="흰색" color="primary" value="흰색"></v-radio>
                      <v-radio label="기타" color="primary" value="기타"></v-radio>
                    </v-radio-group>
                    <input type="text" v-model="etc" class="w150 ml10" :disabled="etcDisabled" :readonly="onlyRead" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>사진 첨부</td>
                <td colspan="7">
                  <ul class="thumbnail">
                    <li v-for="(item, index) in file" :key="index">
                      <div class="thubmnail-type">
                        <v-icon @click="confirmPhoto(item.url)" v-if="actualSurveyPartnerStatus !== 'SYS21819B005'">mdi-close-circle</v-icon>
                        <div v-if="message === false" @click="thumbnailModal({ id: item.url, fileExt: item.fileExt, name: item.name })">
                          <img :src="`${url}/file/fileView/${item.url}?size=80`" />
                        </div>
                      </div>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr v-if="!onlyRead">
                <td>파일 업로드</td>
                <td class="file-add" colspan="7">
                  <div class="file-wrap">
                    <file-upload :deleteAll="deleteAllFiles" @uploadFiles="uploadFiles" :fileType="'image/*'"></file-upload>
                    <ul class="thumbnail mt10">
                      <li v-for="(item, index) in uploadFiles" :key="index">
                        <v-icon v-if="!onlyRead" @click="confirmPhoto(item.url)">mdi-close-circle</v-icon>
                        <div v-if="message === false" class="thubmnail-type" :class="{ 'pdf-bg': item.fileExt === 'pdf' }">
                          <span
                            class="pdf"
                            v-if="item.fileExt === 'pdf'"
                            @click="pdfModal({ id: item.url, fileExt: item.fileExt, name: item.name })"
                            >{{ item.name }}</span
                          >
                          <img
                            v-else
                            :src="`${url}/file/fileView/${item.url}?size=80`"
                            @click="thumbnailModal({ id: item.url, fileExt: item.fileExt, name: item.name })"
                          />
                        </div>
                      </li>
                      <div v-if="message === true">첨부된 파일이 없습니다.</div>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>기타특이사항</td>
                <td colspan="7">
                  <textarea v-model="actualSurveyPartnerSignificantOuters" :readonly="onlyRead"></textarea>
                </td>
              </tr>
            </table>
            <div class="tbl-div-line"></div>
            <table width="100%" class="tbl-reg column2">
              <colgroup>
                <col width="120" />
                <col width="*" />
                <col width="120" />
                <col width="*" />
                <col width="120" />
                <col width="*" />
                <col width="120" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>생성일시</td>
                <td colspan="3"><input type="text" v-model="created_at" readonly /></td>
                <td>업데이트 일시</td>
                <td colspan="3"><input type="text" v-model="updated_at" readonly /></td>
              </tr>
            </table>
          </div>
        </section>
        <!-- 알럿 -->
        <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
        <!-- 사진파일 삭제 컨펌 -->
        <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
      </div>
    </template>
    <template slot="footer">
      <!-- <v-btn small @click="close">취소</v-btn> -->
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import { mapGetters } from "vuex";
import DatePicker from "@/components/form/DatePicker.vue";
import PullDown from "@/components/form/PullDown.vue";
import alim from "@/components/dialog/Alim.vue";
import { getPopupOpt } from "@/utils/modal";
import AddressModal from "@/components/modal/common/Address";
import thumbnailModal from "@/components/modal/common/Thumbnail";
import loading from "@/mixins/loading";
import FileUpload from "@/components/form/FileUpload.vue";
import bus from "@/utils/bus";
import confirm from "@/components/dialog/Confirm.vue";
import alimMixin from "@/mixins/alim.js";
import throttle from "lodash/throttle";
import deleteMixin from "@/mixins/delete.js";
import fileupload from "@/mixins/fileUpload.js";
export default {
  components: {
    modalWrap,
    DatePicker,
    PullDown,
    alim,
    confirm,
    FileUpload,
  },
  mixins: [loading, alimMixin, deleteMixin, fileupload],
  props: ["id", "Allreadonly"], //Allreadonly 값을 설정 시 전체가 readonly로 변환
  data() {
    return {
      actualSurveyPartnerSid: "",
      actualSurveyPartnerDate: "",
      company: "",
      name: "",
      companySid: "",
      companyPersonSid: "",
      companyName: "",
      companyPersonName: "",
      actualSurveyPartnerUserDate: "",
      actualSurveyPartnerUserName: "",
      actualSurveyPartnerUserCompanyName: "",
      actualSurveyPartnerUserEmail: "",
      actualSurveyPartnerUserHp: "",
      actualSurveyPartnerInstallDate: "",
      actualSurveyPartnerInstallTime: "",
      actualSurveyPartnerZipCode: "",
      actualSurveyPartnerUserAddress1: "",
      actualSurveyPartnerUserAddress2: "",
      actualSurveyPartnerAnalyzeVolume: "",
      actualSurveyPartnerAnalyzeVolumeName: "",
      actualSurveyPartnerAnalyzeLocation: "",
      actualSurveyPartnerAnalyzeLocationName: "",
      actualSurveyPartnerFloatingPopulation: "",
      actualSurveyPartnerProduct: "",
      actualSurveyPartnerProductName: "",
      actualSurveyPartnerGlassType: "",
      actualSurveyPartnerGlassTypeName: "",
      actualSurveyPartnerVideoPreferencias: "",
      actualSurveyPartnerVideoPreferenciasName: "",
      actualSurveyPartnerVideoProjectionArea: "",
      actualSurveyPartnerTrafficSensorPosition: "",
      actualSurveyPartnerFilmSize: "",
      actualSurveyPartnerIntensityIlluminationIn: "",
      actualSurveyPartnerIntensityIlluminationOut: "",
      actualSurveyPartnerWindowTintingEqup: "",
      actualSurveyPartnerWindowTintingEqupName: "",
      actualSurveyPartnerLeasePeriod: "",
      actualSurveyPartnerProjectionDistance: "",
      actualSurveyPartnerVideoFormal: "",
      actualSurveyPartnerVideoFormalName: "",
      actualSurveyPartnerDrivingType: "",
      actualSurveyPartnerDrivingTypeName: "",
      actualSurveyPartnerGlassSurface: "",
      actualSurveyPartnerSpecialConstruction: "",
      actualSurveyPartnerSpecialConstructionName: "",
      actualSurveyPartnerCeilingType: "",
      actualSurveyPartnerCeilingTypeEtc: "",
      actualSurveyPartnerCardinalPoints: "",
      actualSurveyPartnerLightSource: "",
      actualSurveyPartnerControllerPosition: "",
      actualSurveyPartnerProjectEqupType: "",
      actualSurveyPartnerPartnerConsultation: [],
      actualSurveyPartnerProjectBracketType: "",
      actualSurveyPartnerSignificantOuters: "",
      actualSurveyPartnerStatus: "",
      actualSurveyPartnerStatusName: "",
      actualSurveyPartnerCeilingHeight: "",
      actualSurveyPartnerWeather: "",
      actualSurveyPartnerOrderFilmTerminal: "",
      actualSurveyPartnerSilliconColor: "",
      etc: "",
      created_at: "",
      updated_at: "",
      message: true,
      etcDisabled: true,
      file: [],
      // uploadFiles: [],
      delId: "",
      //풀다운 코드
      storeCode: "SYS21802B016",
      locationCode: "SYS21802B017",
      productCode: "SYS21802B007",
      glassCode: "SYS21802B029",
      movPositionCode: "SYS21802B042",
      tintingCode: "SYS21802B039",
      haveCode: "SYS21802B067",
      actionCode: "SYS21802B075",
      specialCode: "SYS21802B033",
      //풀다운 넘버일 경우
      num: true,
      onlyRead: false, //전체 input read only status
      url: process.env.VUE_APP_API,
    };
  },
  computed: {
    ...mapGetters("actualSurveyPartner", [
      "getActualSurveyPartnerDetail",
      "getActualSurveyParnterUpdateResult",
      "actualSurveyParnterCustomerResult",
      "actualSurveyParnterStatusResult",
      "actualSurveyParnterStatusResult",
    ]),
    ...mapGetters("common", ["fileDeleteResult"]),
  },
  watch: {
    actualSurveyPartnerSilliconColor(n) {
      if (n === "기타") {
        this.etcDisabled = false;
      } else {
        this.etcDisabled = true;
        this.etc = "";
      }
    },
  },
  mounted() {
    this.reload(this.id);

    if (this.Allreadonly) {
      this.onlyRead = true;
    }
  },
  methods: {
    async reload(id) {
      if (id == undefined || id.length === 0) {
        id = this.actualSurveyPartnerSid;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("actualSurveyPartner/ACTUALSURVEYPARTNER_DETAIL", id);
        if (this.getActualSurveyPartnerDetail.channeltuneApiResult.errorCode == 200) {
          const actualServeyPartner = this.getActualSurveyPartnerDetail.channeltuneApiResult.actualSurveyPartner;

          if (
            actualServeyPartner.actualSurveyPartnerSilliconColor !== "검정색" &&
            actualServeyPartner.actualSurveyPartnerSilliconColor !== "회색" &&
            actualServeyPartner.actualSurveyPartnerSilliconColor !== "흰색"
          ) {
            this.actualSurveyPartnerSilliconColor = "기타";
            this.etc = actualServeyPartner.actualSurveyPartnerSilliconColor;
          } else {
            this.actualSurveyPartnerSilliconColor = actualServeyPartner.actualSurveyPartnerSilliconColor;
          }
          this.actualSurveyPartnerSid = actualServeyPartner.actualSurveyPartnerSid;
          this.actualSurveyPartnerDate = actualServeyPartner.actualSurveyPartnerDate;
          this.companySid = actualServeyPartner.companySid;
          this.companyPersonSid = actualServeyPartner.companyPersonSid;
          this.actualSurveyPartnerUserDate = actualServeyPartner.actualSurveyPartnerUserDate;
          this.actualSurveyPartnerUserName = actualServeyPartner.actualSurveyPartnerUserName;
          this.actualSurveyPartnerUserCompanyName = actualServeyPartner.actualSurveyPartnerUserCompanyName;
          this.actualSurveyPartnerUserEmail = actualServeyPartner.actualSurveyPartnerUserEmail;
          this.actualSurveyPartnerUserHp = actualServeyPartner.actualSurveyPartnerUserHp;
          this.actualSurveyPartnerInstallDate = actualServeyPartner.actualSurveyPartnerInstallDate;
          this.actualSurveyPartnerInstallTime = actualServeyPartner.actualSurveyPartnerInstallTime;
          this.actualSurveyPartnerZipCode = actualServeyPartner.actualSurveyPartnerZipCode;
          this.actualSurveyPartnerUserAddress1 = actualServeyPartner.actualSurveyPartnerUserAddress1;
          this.actualSurveyPartnerUserAddress2 = actualServeyPartner.actualSurveyPartnerUserAddress2;
          this.actualSurveyPartnerAnalyzeVolume = actualServeyPartner.actualSurveyPartnerAnalyzeVolume;
          this.actualSurveyPartnerAnalyzeVolumeName = actualServeyPartner.actualSurveyPartnerAnalyzeVolumeName;
          this.actualSurveyPartnerAnalyzeLocation = actualServeyPartner.actualSurveyPartnerAnalyzeLocation;
          this.actualSurveyPartnerAnalyzeLocationName = actualServeyPartner.actualSurveyPartnerAnalyzeLocationName;
          this.actualSurveyPartnerFloatingPopulation = actualServeyPartner.actualSurveyPartnerFloatingPopulation;
          this.actualSurveyPartnerProduct = actualServeyPartner.actualSurveyPartnerProduct;
          this.actualSurveyPartnerProductName = actualServeyPartner.actualSurveyPartnerProductName;
          this.actualSurveyPartnerGlassType = actualServeyPartner.actualSurveyPartnerGlassType;
          this.actualSurveyPartnerGlassTypeName = actualServeyPartner.actualSurveyPartnerGlassTypeName;
          this.actualSurveyPartnerVideoPreferencias = actualServeyPartner.actualSurveyPartnerVideoPreferencias;
          this.actualSurveyPartnerVideoPreferencias = actualServeyPartner.actualSurveyPartnerVideoPreferencias;
          this.actualSurveyPartnerVideoPreferenciasName = actualServeyPartner.actualSurveyPartnerVideoPreferenciasName;
          this.actualSurveyPartnerVideoProjectionArea = actualServeyPartner.actualSurveyPartnerVideoProjectionArea;
          this.actualSurveyPartnerTrafficSensorPosition = actualServeyPartner.actualSurveyPartnerTrafficSensorPosition;
          this.actualSurveyPartnerFilmSize = actualServeyPartner.actualSurveyPartnerFilmSize;
          this.actualSurveyPartnerIntensityIlluminationIn = actualServeyPartner.actualSurveyPartnerIntensityIlluminationIn;
          this.actualSurveyPartnerIntensityIlluminationOut = actualServeyPartner.actualSurveyPartnerIntensityIlluminationOut;
          this.actualSurveyPartnerWindowTintingEqup = actualServeyPartner.actualSurveyPartnerWindowTintingEqup;
          this.actualSurveyPartnerWindowTintingEqupName = actualServeyPartner.actualSurveyPartnerWindowTintingEqupName;
          this.actualSurveyPartnerLeasePeriod = actualServeyPartner.actualSurveyPartnerLeasePeriod;
          this.actualSurveyPartnerProjectionDistance = actualServeyPartner.actualSurveyPartnerProjectionDistance;
          this.actualSurveyPartnerVideoFormal = actualServeyPartner.actualSurveyPartnerVideoFormal;
          this.actualSurveyPartnerVideoFormalName = actualServeyPartner.actualSurveyPartnerVideoFormalName;
          this.actualSurveyPartnerDrivingType = actualServeyPartner.actualSurveyPartnerDrivingType;
          this.actualSurveyPartnerDrivingTypeName = actualServeyPartner.actualSurveyPartnerDrivingTypeName;
          this.actualSurveyPartnerGlassSurface = actualServeyPartner.actualSurveyPartnerGlassSurface;
          this.actualSurveyPartnerSpecialConstruction = actualServeyPartner.actualSurveyPartnerSpecialConstruction;
          this.actualSurveyPartnerSpecialConstructionName = actualServeyPartner.actualSurveyPartnerSpecialConstructionName;
          this.actualSurveyPartnerCeilingType = actualServeyPartner.actualSurveyPartnerCeilingType;
          this.actualSurveyPartnerCeilingTypeEtc = actualServeyPartner.actualSurveyPartnerCeilingTypeEtc;
          this.actualSurveyPartnerCardinalPoints = actualServeyPartner.actualSurveyPartnerCardinalPoints;
          this.actualSurveyPartnerLightSource = actualServeyPartner.actualSurveyPartnerLightSource;
          this.actualSurveyPartnerControllerPosition = actualServeyPartner.actualSurveyPartnerControllerPosition;
          this.actualSurveyPartnerProjectEqupType = actualServeyPartner.actualSurveyPartnerProjectEqupType;
          this.actualSurveyPartnerCeilingHeight = actualServeyPartner.actualSurveyPartnerCeilingHeight;
          this.actualSurveyPartnerWeather = actualServeyPartner.actualSurveyPartnerWeather;
          this.actualSurveyPartnerOrderFilmTerminal = actualServeyPartner.actualSurveyPartnerOrderFilmTerminal;
          if (actualServeyPartner.actualSurveyPartnerPartnerConsultation !== null) {
            this.actualSurveyPartnerPartnerConsultation = actualServeyPartner.actualSurveyPartnerPartnerConsultation.split(",");
          }
          //img url
          this.file = [];
          actualServeyPartner.fileResult.forEach(row => {
            if (row.fileSid !== "") {
              this.file.push({ url: row.fileSid, name: row.fileFileName, fileExt: row.fileExt });
            }
          });
          this.file[0] === undefined ? (this.message = true) : (this.message = false);
          this.actualSurveyPartnerProjectBracketType = actualServeyPartner.actualSurveyPartnerProjectBracketType;
          this.actualSurveyPartnerSignificantOuters = actualServeyPartner.actualSurveyPartnerSignificantOuters;
          this.actualSurveyPartnerStatus = actualServeyPartner.actualSurveyPartnerStatus;
          this.actualSurveyPartnerStatusName = actualServeyPartner.actualSurveyPartnerStatusName;
          this.created_at = actualServeyPartner.created_at;
          this.updated_at = actualServeyPartner.updated_at;
          this.companyName = actualServeyPartner.companyName;
          this.companyPersonName = actualServeyPartner.companyPersonName;
          this.company = this.companyName + "(" + this.companySid + ")";
          this.name = this.companyPersonName + "(" + this.companyPersonSid + ")";
        } else {
          this.alim(this.getActualSurveyPartnerDetail.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //주소찾기 모달
    showAddressModalPopup() {
      this.$modal.show(AddressModal, { updateZip: this.updateZip }, getPopupOpt("AddressModal", "560px", "auto", false));
    },
    //모달에서 주소 선택시
    updateZip(data) {
      this.actualSurveyPartnerZipCode = data.zip;
      this.actualSurveyPartnerUserAddress1 = data.addr1;
    },
    //썸네일 모달
    thumbnailModal(data) {
      const file = this.file;
      const status = this.actualSurveyPartnerStatus;
      this.$modal.show(thumbnailModal, { updateData: this.reload, file, status, data }, getPopupOpt("thumbnailModal", "1000px", "auto", false));
    },
    close() {
      this.$emit("close");
    },
    //수정
    async modify() {
      let color = "";
      if (this.actualSurveyPartnerSilliconColor === "기타") {
        color = this.etc;
      } else {
        color = this.actualSurveyPartnerSilliconColor;
      }
      let partner = this.actualSurveyPartnerPartnerConsultation.join(",");
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("actualSurveyPartner/ACTUALSURVEYPARTNER_UPDATE", {
          actualSurveyPartnerSilliconColor: color,
          actualSurveyPartnerSid: this.actualSurveyPartnerSid,
          actualSurveyPartnerUserDate: this.actualSurveyPartnerUserDate,
          actualSurveyPartnerUserName: this.actualSurveyPartnerUserName,
          actualSurveyPartnerUserCompanyName: this.actualSurveyPartnerUserCompanyName,
          actualSurveyPartnerUserEmail: this.actualSurveyPartnerUserEmail,
          actualSurveyPartnerUserHp: this.actualSurveyPartnerUserHp,
          actualSurveyPartnerInstallDate: this.actualSurveyPartnerInstallDate,
          actualSurveyPartnerLeasePeriod: this.actualSurveyPartnerLeasePeriod,
          actualSurveyPartnerInstallTime: this.actualSurveyPartnerInstallTime,
          actualSurveyPartnerZipCode: this.actualSurveyPartnerZipCode,
          actualSurveyPartnerUserAddress1: this.actualSurveyPartnerUserAddress1,
          actualSurveyPartnerUserAddress2: this.actualSurveyPartnerUserAddress2,
          actualSurveyPartnerAnalyzeVolume: this.actualSurveyPartnerAnalyzeVolume,
          actualSurveyPartnerAnalyzeLocation: this.actualSurveyPartnerAnalyzeLocation,
          actualSurveyPartnerFloatingPopulation: this.actualSurveyPartnerFloatingPopulation,
          actualSurveyPartnerProduct: this.actualSurveyPartnerProduct,
          actualSurveyPartnerGlassType: this.actualSurveyPartnerGlassType,
          actualSurveyPartnerVideoPreferencias: this.actualSurveyPartnerVideoPreferencias,
          actualSurveyPartnerTrafficSensorPosition: this.actualSurveyPartnerTrafficSensorPosition,
          actualSurveyPartnerSpecialConstruction: this.actualSurveyPartnerSpecialConstruction,
          actualSurveyPartnerFilmSize: this.actualSurveyPartnerFilmSize,
          actualSurveyPartnerIntensityIlluminationIn: this.actualSurveyPartnerIntensityIlluminationIn,
          actualSurveyPartnerIntensityIlluminationOut: this.actualSurveyPartnerIntensityIlluminationOut,
          actualSurveyPartnerWindowTintingEqup: this.actualSurveyPartnerWindowTintingEqup,
          actualSurveyPartnerVideoFormal: this.actualSurveyPartnerVideoFormal,
          actualSurveyPartnerGlassSurface: this.actualSurveyPartnerGlassSurface,
          actualSurveyPartnerDrivingType: this.actualSurveyPartnerDrivingType,
          actualSurveyPartnerProjectionDistance: this.actualSurveyPartnerProjectionDistance,
          actualSurveyPartnerCeilingType: this.actualSurveyPartnerCeilingType,
          actualSurveyPartnerCeilingTypeEtc: this.actualSurveyPartnerCeilingTypeEtc,
          actualSurveyPartnerVideoProjectionArea: this.actualSurveyPartnerVideoProjectionArea,
          actualSurveyPartnerCardinalPoints: this.actualSurveyPartnerCardinalPoints,
          actualSurveyPartnerLightSource: this.actualSurveyPartnerLightSource,
          actualSurveyPartnerControllerPosition: this.actualSurveyPartnerControllerPosition,
          actualSurveyPartnerProjectEqupType: this.actualSurveyPartnerProjectEqupType,
          actualSurveyPartnerPartnerConsultation: partner,
          actualSurveyPartnerProjectBracketType: this.actualSurveyPartnerProjectBracketType,
          actualSurveyPartnerSignificantOuters: this.actualSurveyPartnerSignificantOuters,
          actualSurveyPartnerDate: this.actualSurveyPartnerDate,
          actualSurveyPartnerStatus: this.actualSurveyPartnerStatus,
          actualServeyPartner: this.actualServeyPartner,
          actualSurveyPartnerWeather: this.actualSurveyPartnerWeather,
          actualSurveyPartnerOrderFilmTerminal: this.actualSurveyPartnerOrderFilmTerminal,
          actualSurveyPartnerCeilingHeight: this.actualSurveyPartnerCeilingHeight,
        });
        if (this.getActualSurveyParnterUpdateResult.channeltuneApiResult.errorCode == 200) {
          this.alim("수정 되었습니다.", this.successColor);
          this.reload(this.actualSurveyPartnerSid);
          this.$attrs.update();
        } else {
          this.alim(this.getActualSurveyParnterUpdateResult.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //잠재고객 처리
    customer: throttle(async function () {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("actualSurveyPartner/ACTUALSURVEYPARTNER_CUSTOMER", this.actualSurveyPartnerSid);
        if (this.actualSurveyParnterCustomerResult.channeltuneApiResult.errorCode == 200) {
          this.alim("잠재고객 처리가 되었습니다.", this.successColor);
          await this.reload(this.actualSurveyPartnerSid);
          this.$attrs.update();
        } else {
          this.alim(this.actualSurveyParnterCustomerResult.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    }, 1000),
    //취소
    async cancel() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("actualSurveyPartner/ACTUALSURVEYPARTNER_STATUS", {
          actualSurveyPartnerSid: this.actualSurveyPartnerSid,
          actualSurveyPartnerStatus: "SYS21819B006",
        });
        if (this.actualSurveyParnterStatusResult.channeltuneApiResult.errorCode == 200) {
          this.alim("반려 되었습니다.", this.successColor);
          await this.reload(this.actualSurveyPartnerSid);
          this.$attrs.update();
        } else {
          this.alim(this.actualSurveyParnterStatusResult.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //반려 취소
    async rejectCancel() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("actualSurveyPartner/ACTUALSURVEYPARTNER_STATUS", {
          actualSurveyPartnerSid: this.actualSurveyPartnerSid,
          actualSurveyPartnerStatus: "SYS21819B004",
        });
        if (this.actualSurveyParnterStatusResult.channeltuneApiResult.errorCode == 200) {
          this.alim("반려 취소 되었습니다.", this.successColor);
          await this.reload(this.actualSurveyPartnerSid);
          this.$attrs.update();
        } else {
          this.alim(this.actualSurveyParnterStatusResult.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //날짜 입력 emit
    actualSurveyPartnerUserDateProp(date) {
      this.actualSurveyPartnerUserDate = date;
    },
    actualSurveyPartnerInstallDateProp(date) {
      this.actualSurveyPartnerInstallDate = date;
    },
    //풀다운 데이터 emit
    selectStoreLevel(data) {
      this.actualSurveyPartnerAnalyzeVolume = data.sysCodeSid;
      this.actualSurveyPartnerAnalyzeVolumeName = data.sysCodeName;
    },
    selectLocation(data) {
      this.actualSurveyPartnerAnalyzeLocation = data.sysCodeSid;
      this.actualSurveyPartnerAnalyzeLocationName = data.sysCodeName;
    },
    selectProduct(data) {
      this.actualSurveyPartnerProduct = data.sysCodeSid;
      this.actualSurveyPartnerProductName = data.sysCodeName;
    },
    selectGlass(data) {
      this.actualSurveyPartnerGlassType = data.sysCodeSid;
      this.actualSurveyPartnerGlassTypeName = data.sysCodeName;
    },
    selectPosition(data) {
      this.actualSurveyPartnerVideoPreferencias = data.sysCodeSid;
      this.actualSurveyPartnerVideoPreferenciasName = data.sysCodeName;
    },
    selectTinting(data) {
      this.actualSurveyPartnerWindowTintingEqup = data.sysCodeSid;
      this.actualSurveyPartnerWindowTintingEqupName = data.sysCodeName;
    },
    selectHave(data) {
      this.actualSurveyPartnerVideoFormal = data.sysCodeSid;
      this.actualSurveyPartnerVideoFormalName = data.sysCodeName;
    },
    actionHave(data) {
      this.actualSurveyPartnerDrivingType = data.sysCodeSid;
      this.actualSurveyPartnerDrivingTypeName = data.sysCodeName;
    },
    selectSpecial(data) {
      this.actualSurveyPartnerSpecialConstruction = data.sysCodeSid;
      this.actualSurveyPartnerSpecialConstructionName = data.sysCodeName;
    },
    //사진파일 삭제
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "photo") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("common/FILE_DELETE", this.delId);
            if (this.fileDeleteResult.channeltuneApiResult.errorCode == 200) {
              this.alim("삭제 되었습니다.", this.successColor);
              await this.reload(this.actualSurveyPartnerSid);
            } else {
              this.alim(this.fileDeleteResult.channeltuneApiResult.errorMessage, this.errorColor);
            }
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
      }
      this.resetDeleteData();
    },
  },
};
</script>

<style lang="scss" scoped>
.v-application {
  justify-content: space-between;
  & .init-wrap {
    overflow-y: auto;
    max-height: 700px;
  }
  & .tbl-reg {
    & tr {
      & td {
        & .date {
          width: 100% !important;
        }
        & .etc {
          margin-left: 5px;
          & input[type="text"] {
            width: 310px;
          }
        }
      }
    }
  }
  & .url-create {
    & input {
      width: calc(100% - 160px) !important;
      margin: 0 10px 0 3px;
    }
  }
}
</style>
