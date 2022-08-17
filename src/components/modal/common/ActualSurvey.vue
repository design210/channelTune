<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>실측 리포트 등록</h2>
    </template>
    <template slot="body">
      <div class="v-application">
        <section v-if="!readStatus" class="right-column init-wrap section-box border-outside">
          <div class="border">
            <div class="header">
              <h3>스토어 고객 정보</h3>
            </div>
            <table width="100%" class="tbl-reg column2">
              <colgroup>
                <col width="100" />
                <col width="*" />
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>고유 코드</td>
                <td><input type="text" readonly v-model="prospectiveCustomerSid" /></td>
                <td>상태</td>
                <td><input type="text" readonly v-model="prospectiveCustomerStatusName" /></td>
              </tr>
              <tr>
                <td>스토어 유형</td>
                <td><input type="text" readonly v-model="prospectiveCustomerStoreKindName" /></td>
                <td>등록날짜</td>
                <td><input type="text" readonly v-model="prospectiveCustomerDate" /></td>
              </tr>
              <tr>
                <td>스토어(사이트)명</td>
                <td colspan="3" class="single"><input type="text" readonly v-model="prospectiveCustomerStoreName" /></td>
              </tr>
              <tr>
                <td>스토어 국가</td>
                <td><input type="text" readonly v-model="prospectiveCustomerStoreNationName" /></td>
                <td>스토어 지역</td>
                <td><input type="text" readonly v-model="prospectiveCustomerStoreArea" /></td>
              </tr>
              <tr>
                <td>내부 담당자</td>
                <td colspan="3" class="single field-div no-btn">
                  <input type="text" class="input-first" readonly v-model="interbridEmployeeSid" />
                  <input type="text" class="input-last" readonly v-model="interbridEmployeeName" />
                </td>
              </tr>
              <tr>
                <td>영업 업체</td>
                <td colspan="3" class="single field-div no-btn">
                  <input type="text" class="input-first" readonly v-model="companySid" />
                  <input type="text" class="input-last" readonly v-model="companyName" />
                </td>
              </tr>
              <tr>
                <td>영업 담당자</td>
                <td colspan="3" class="single field-div no-btn">
                  <input type="text" class="input-first" readonly v-model="companyPersonSid" />
                  <input type="text" class="input-last" readonly v-model="companyPersonName" />
                </td>
              </tr>
              <tr>
                <td>스토어 담당자</td>
                <td><input type="text" readonly v-model="prospectiveCustomerName" /></td>
                <td>스토어 연락처</td>
                <td><input type="text" readonly v-model="prospectiveCustomerHp" /></td>
              </tr>
              <tr>
                <td>스토어 우편번호</td>
                <td colspan="3" class="single">
                  <input type="text" class="zip zip-status" readonly v-model="prospectiveCustomerZipCode" />
                </td>
              </tr>
              <tr>
                <td>스토어 주소</td>
                <td colspan="3" class="single"><input type="text" readonly class="zip-status" v-model="prospectiveCustomerAddress1" /></td>
              </tr>
              <tr>
                <td>스토어 상세 주소</td>
                <td colspan="3" class="single"><input type="text" readonly v-model="prospectiveCustomerAddress2" /></td>
              </tr>
            </table>
            <div class="tbl-div-line"></div>
            <table width="100%" class="tbl-reg column2">
              <colgroup>
                <col width="100" />
                <col width="*" />
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>스토어 상권</td>
                <td><input type="text" readonly v-model="prospectiveCustomerAnalyzeVolumeName" /></td>
                <td>입지분석</td>
                <td><input type="text" readonly v-model="prospectiveCustomerAnalyzeLocationName" /></td>
              </tr>
              <tr>
                <td>유동인구 20대</td>
                <td><input type="text" class="with-text" readonly v-model="prospectiveCustomerFloatingPopulation20" /> 명</td>
                <td>유동인구 30대</td>
                <td><input type="text" class="with-text" readonly v-model="prospectiveCustomerFloatingPopulation30" /> 명</td>
              </tr>
              <tr>
                <td>유동인구 40대</td>
                <td><input type="text" class="with-text" readonly v-model="prospectiveCustomerFloatingPopulation40" /> 명</td>
                <td>유동인구 50대</td>
                <td><input type="text" class="with-text" readonly v-model="prospectiveCustomerFloatingPopulation50" /> 명</td>
              </tr>
              <tr>
                <td>특이사항</td>
                <td colspan="3" class="single textarea-space"><textarea readonly v-model="prospectiveCustomerMemo"></textarea></td>
              </tr>
              <tr>
                <td>실측후진행상황</td>
                <td colspan="3" class="single textarea-space"><textarea readonly v-model="prospectiveCustomerConsultationMemo"></textarea></td>
              </tr>
              <tr>
                <td>실측날짜</td>
                <td><input type="text" readonly v-model="prospectiveCustomerSurveyDate" /></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>설치 예정 날짜</td>
                <td><input type="text" readonly v-model="prospectiveCustomerEquipPlanDate" /></td>
                <td>품의 진행 날짜</td>
                <td><input type="text" readonly v-model="prospectiveCustomerConsultationDate" /></td>
              </tr>
              <tr>
                <td>선팅 날짜</td>
                <td><input type="text" readonly v-model="prospectiveCustomerWindowTintingDate" /></td>
                <td>설치완료 날짜</td>
                <td><input type="text" readonly v-model="prospectiveCustomerEquipCompleteDate" /></td>
              </tr>
            </table>
          </div>
        </section>
        <section :class="readStatus ? 'second-column' : 'left-column'" class="init-wrap section-box border-outside">
          <div class="border">
            <div class="header">
              <h3>실측 리포트</h3>
              <div class="btn-group" v-if="!readStatus">
                <v-btn small color="primary" dark @click="save">저장</v-btn>
              </div>
            </div>
            <table width="100%" class="tbl-reg column2">
              <colgroup>
                <col width="100" />
                <col width="*" />
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr>
                <td>실측고유코드</td>
                <td><input type="text" readonly v-model="actualSurveySid" /></td>
                <td class="required">상태</td>
                <td>
                  <input v-if="readStatus" type="text" readonly v-model="actualSurveyStatusName" />
                  <pull-down
                    v-else
                    :onlyRead="readStatus"
                    :data="actualSurveyStatus"
                    :code="statusCode"
                    @selected="actualSurveyStatusNameProp"
                    class="pull-down"
                  ></pull-down>
                </td>
              </tr>
              <tr>
                <td class="required">실측날짜</td>
                <td class="date-100">
                  <input v-if="readStatus" type="text" readonly v-model="actualSurveyDate" />
                  <date-picker v-else :propdate="actualSurveyDate" @updateDate="actualSurveyDateProp"></date-picker>
                </td>
                <td class="required">실측자</td>
                <td><input type="text" :readonly="readStatus" v-model="actualSurveyName" /></td>
              </tr>
              <tr>
                <td class="required">유리형태</td>
                <td class="date-100">
                  <input v-if="readStatus" type="text" readonly v-model="actualSurveyGlassTypeName" />
                  <pull-down
                    v-else
                    :onlyRead="readStatus"
                    :data="actualSurveyGlassType"
                    :code="glassTypeCode"
                    @selected="actualSurveyGlassTypeNameProp"
                    class="pull-down"
                  ></pull-down>
                </td>
                <td class="required">필름전체크기</td>
                <td>
                  <input
                    type="text"
                    :readonly="readStatus"
                    v-model="actualSurveyFilmSize"
                    placeholder="가로*세로(단위:mm) / 중간 프레임 포함(필요시)"
                  />
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <div class="column3">
                    <div>
                      <p class="required">발주필름 A 사이즈</p>
                      <p><input type="text" :readonly="readStatus" v-model="actualSurveyOrderFilmSize1" placeholder="가로*세로(단위:mm)" /></p>
                    </div>
                    <div>
                      <p class="required">발주필름 A 수량</p>
                      <p>
                        <input v-if="readStatus" type="text" readonly v-model="actualSurveyOrderFilmCount1" />

                        <pull-down-num
                          v-else
                          :onlyRead="readStatus"
                          :data="actualSurveyOrderFilmCount1"
                          :code="filmNumCode"
                          @selected="actualSurveyOrderFilmCount1Prop"
                          class="pull-down"
                        ></pull-down-num>
                      </p>
                    </div>
                    <div>
                      <p class="required">발주필름 A 단자방향</p>
                      <div class="radio">
                        <v-radio-group :readonly="readStatus" v-model="actualSurveyOrderFilmTerminal1">
                          <v-radio label="상단자" value="상단자"></v-radio>
                          <v-radio label="측면단자" value="측면단자"></v-radio>
                        </v-radio-group>
                      </div>
                    </div>
                  </div>
                  <div class="column3">
                    <div>
                      <p>발주필름 B 사이즈</p>
                      <p><input type="text" :readonly="readStatus" v-model="actualSurveyOrderFilmSize2" placeholder="가로*세로(단위:mm)" /></p>
                    </div>
                    <div>
                      <p>발주필름 B 수량</p>
                      <p>
                        <input v-if="readStatus" type="text" readonly v-model="actualSurveyOrderFilmCount2" />
                        <pull-down-num
                          v-else
                          :onlyRead="readStatus"
                          :data="actualSurveyOrderFilmCount2"
                          :code="filmNumCode"
                          @selected="actualSurveyOrderFilmCount2Prop"
                          class="pull-down"
                        ></pull-down-num>
                      </p>
                    </div>
                    <div>
                      <p>발주필름 B 단자방향</p>
                      <div class="radio">
                        <v-radio-group v-model="actualSurveyOrderFilmTerminal2" :readonly="readStatus">
                          <v-radio label="상단자" value="상단자"></v-radio>
                          <v-radio label="측면단자" value="측면단자"></v-radio>
                        </v-radio-group>
                      </div>
                    </div>
                  </div>
                  <div class="column3">
                    <div>
                      <p>발주필름 C 사이즈</p>
                      <p><input type="text" :readonly="readStatus" v-model="actualSurveyOrderFilmSize3" placeholder="가로*세로(단위:mm)" /></p>
                    </div>
                    <div>
                      <p>발주필름 C 수량</p>
                      <p>
                        <input v-if="readStatus" type="text" readonly v-model="actualSurveyOrderFilmCount3" />
                        <pull-down-num
                          v-else
                          :onlyRead="readStatus"
                          :data="actualSurveyOrderFilmCount3"
                          :code="filmNumCode"
                          @selected="actualSurveyOrderFilmCount3Prop"
                          class="pull-down"
                        ></pull-down-num>
                      </p>
                    </div>
                    <div>
                      <p>발주필름 C 단자방향</p>
                      <div class="radio">
                        <v-radio-group v-model="actualSurveyOrderFilmTerminal3" :readonly="readStatus">
                          <v-radio label="상단자" value="상단자"></v-radio>
                          <v-radio label="측면단자" value="측면단자"></v-radio>
                        </v-radio-group>
                      </div>
                    </div>
                  </div>
                  <div class="column3">
                    <div>
                      <p>발주필름 D 사이즈</p>
                      <p><input type="text" :readonly="readStatus" v-model="actualSurveyOrderFilmSize4" placeholder="가로*세로(단위:mm)" /></p>
                    </div>
                    <div>
                      <p>발주필름 D 수량</p>
                      <p>
                        <input v-if="readStatus" type="text" readonly v-model="actualSurveyOrderFilmCount4" />
                        <pull-down-num
                          v-else
                          :onlyRead="readStatus"
                          :data="actualSurveyOrderFilmCount4"
                          :code="filmNumCode"
                          @selected="actualSurveyOrderFilmCount4Prop"
                          class="pull-down"
                        ></pull-down-num>
                      </p>
                    </div>
                    <div>
                      <p>발주필름 D 단자방향</p>
                      <div class="radio">
                        <v-radio-group v-model="actualSurveyOrderFilmTerminal4" :readonly="readStatus">
                          <v-radio label="상단자" value="상단자"></v-radio>
                          <v-radio label="측면단자" value="측면단자"></v-radio>
                        </v-radio-group>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
            <div class="tbl-div-line"></div>
            <table width="100%" class="tbl-reg column2">
              <colgroup>
                <col width="100" />
                <col width="*" />
                <col width="100" />
                <col width="*" />
              </colgroup>
              <tr>
                <td class="required">특수시공</td>
                <td>
                  <input v-if="readStatus" type="text" readonly v-model="actualSurveySpecialConstructionName" />
                  <pull-down
                    v-else
                    :onlyRead="readStatus"
                    :data="actualSurveySpecialConstruction"
                    :code="specialCode"
                    @selected="actualSurveySpecialConstructionNameProp"
                    class="pull-down"
                  ></pull-down>
                </td>
                <td class="required">유리 표면 상태</td>
                <td>
                  <input type="text" :readonly="readStatus" v-model="actualSurveyGlassSurface" />
                </td>
              </tr>
              <tr>
                <td class="required">선팅지 시공 여부</td>
                <td>
                  <input v-if="readStatus" type="text" readonly v-model="actualSurveyWindowTintingEqupName" />
                  <pull-down
                    v-else
                    :onlyRead="readStatus"
                    :data="actualSurveyWindowTintingEqup"
                    :code="tintingCode"
                    @selected="actualSurveyWindowTintingEqupNameProp"
                    class="pull-down"
                  ></pull-down>
                </td>
                <td class="required">프레임 컬러</td>
                <td>
                  <input type="text" :readonly="readStatus" v-model="actualSurveyFrameColor" />
                </td>
              </tr>
              <tr>
                <td class="required">영상설치환경</td>
                <td>
                  <input v-if="readStatus" type="text" readonly v-model="actualSurveyVideoPreferenciasName" />
                  <pull-down
                    v-else
                    :onlyRead="readStatus"
                    :data="actualSurveyVideoPreferencias"
                    :code="videoCode"
                    @selected="actualSurveyVideoPreferenciasNameProp"
                    class="pull-down"
                  ></pull-down>
                </td>
                <td class="required">영상투사면적</td>
                <td>
                  <input type="text" :readonly="readStatus" v-model="actualSurveyVideoProjectionArea" placeholder="단위:인치" />
                </td>
              </tr>
              <tr>
                <td class="required">천고</td>
                <td>
                  <input type="text" :readonly="readStatus" v-model="actualSurveyCeilingHeight" placeholder="단위:mm" />
                </td>
                <td class="required">투사거리</td>
                <td>
                  <input type="text" :readonly="readStatus" v-model="actualSurveyProjectionDistance" placeholder="단위:mm" />
                </td>
              </tr>
              <tr>
                <td class="required">프로젝터 모델</td>
                <td>
                  <input v-if="readStatus" type="text" readonly v-model="actualSurveyProjectModel" />
                  <pull-down
                    v-else
                    :onlyRead="readStatus"
                    :data="actualSurveyProjectModelName"
                    :code="modelCode"
                    @selected="actualSurveyProjectModelNameProp"
                    class="pull-down"
                  ></pull-down>
                </td>
                <td class="required">프로젝터 설치대수</td>
                <td><input type="text" :readonly="readStatus" v-model="actualSurveyProjectEqupCount" /></td>
              </tr>
              <tr>
                <td class="required">옵션렌즈(단초점)<br />사용여부</td>
                <td>
                  <div class="radio">
                    <v-radio-group v-model="actualSurveyProjectLensOption" :readonly="readStatus">
                      <v-radio label="사용함" value="Y"></v-radio>
                      <v-radio label="사용안함" value="N"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <div class="column3">
                    <div>
                      <p class="required">실리콘 컬러</p>
                      <div class="radio d-flex align-center">
                        <v-radio-group v-model="actualSurveySilliconColor" :readonly="readStatus">
                          <v-radio label="검정색" color="primary" value="검정색"></v-radio>
                          <v-radio label="회색" color="primary" value="회색"></v-radio>
                          <v-radio label="흰색" color="primary" value="흰색"></v-radio>
                          <v-radio label="기타" color="primary" value="기타"></v-radio>
                        </v-radio-group>
                        <span v-if="actualSurveySilliconColor === '기타'" class="etc">
                          <input type="text" v-model="etc" placeholder="기타 내용을 넣어주세요." :readonly="readStatus" />
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <div class="column3">
                    <div>
                      <p>프로젝터 설치 방식(중복가능)</p>
                      <p>
                        <check-box
                          :onlyRead="readStatus"
                          :data="actualSurveyProjectEqupType"
                          :code="installCode"
                          @selected="actualSurveyProjectEqupTypeProp"
                        ></check-box>
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <div class="column3">
                    <div>
                      <p class="required">천정소재</p>
                      <div class="radio d-flex align-center">
                        <v-radio-group v-model="actualSurveyCeilingType" :readonly="readStatus">
                          <v-radio label="석고보드" color="primary" value="석고보드"></v-radio>
                          <v-radio label="텍스형" color="primary" value="텍스형"></v-radio>
                          <v-radio label="노출형" color="primary" value="노출형"></v-radio>
                          <v-radio label="기타" color="primary" value="기타"></v-radio>
                        </v-radio-group>
                        <span v-if="actualSurveyCeilingType === '기타'" class="etc">
                          <input type="text" v-model="actualSurveyCeilingTypeEtc" placeholder="기타 내용을 넣어주세요." :readonly="readStatus" />
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <div class="column3">
                    <div>
                      <p class="required">방위</p>
                      <div class="radio">
                        <v-radio-group v-model="actualSurveyCardinalPoints" :readonly="readStatus">
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
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="required">실내 조도</td>
                <td>
                  <input type="text" v-model="actualSurveyIntensityIllumination" :readonly="readStatus" />
                </td>
                <td class="required">실외 조도</td>
                <td>
                  <input type="text" v-model="actualSurveyIntensityIlluminationOut" :readonly="readStatus" />
                </td>
              </tr>
              <tr>
                <td class="required">콘트롤러 위치</td>
                <td>
                  <input type="text" v-model="actualSurveyControllerPosition" :readonly="readStatus" />
                </td>
                <td class="required">트래픽센서 설치<br />위치</td>
                <td>
                  <input type="text" v-model="actualSurveyTrafficSensorPosition" placeholder="광고형 또는 필요시 작성" :readonly="readStatus" />
                </td>
              </tr>
              <tr>
                <td class="required">실측일 날씨</td>
                <td>
                  <div class="radio">
                    <v-radio-group v-model="actualSurveyWeather" :readonly="readStatus">
                      <v-radio label="맑음" color="primary" value="맑음"></v-radio>
                      <v-radio label="흐림" color="primary" value="흐림"></v-radio>
                      <v-radio label="눈" color="primary" value="눈"></v-radio>
                      <v-radio label="비" color="primary" value="비"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
                <td class="required">매장 자체 영상<br />보유여부</td>
                <td>
                  <input v-if="readStatus" type="text" readonly v-model="actualSurveyVideoFormalName" />
                  <pull-down
                    v-else
                    :onlyRead="readStatus"
                    :data="actualSurveyVideoFormal"
                    :code="selfCode"
                    @selected="actualSurveyVideoFormalNameProp"
                    class="pull-down"
                  ></pull-down>
                </td>
              </tr>
              <tr>
                <td class="required">필름 마감 방법</td>
                <td>
                  <input type="text" v-model="actualSurveyFilmFinishingsType" :readonly="readStatus" />
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colspan="4">
                  <div class="mt5">
                    <p class="mb5">첨부파일</p>
                    <ul class="thumbnail">
                      <li v-for="(item, index) in file" :key="index">
                        <div class="thubmnail-type">
                          <v-icon v-if="!readStatus" @click="confirmPhoto(item.url)">mdi-close-circle</v-icon>
                          <div v-if="message === false" @click="thumbnailModal({ id: item.url, fileExt: item.fileExt, name: item.name })">
                            <img :src="`${url}/file/fileView/${item.url}?size=80`" />
                          </div>
                        </div>
                      </li>
                      <div v-if="message === true" class="mt5">첨부된 파일이 없습니다.</div>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <div class="mt5">
                    <p class="required mb5">전기배선 상세 설명</p>
                    <textarea v-model="actualSurveyElectricWiring" :readonly="readStatus"></textarea>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <div class="mt5">
                    <p class="required mb5">HDMI, LAN, RS232, VCTF 배선 방식 및 필요 길이 상세 기재</p>
                    <textarea v-model="actualSurveyElectricWiringType" :readonly="readStatus"></textarea>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="required">구동방식</td>
                <td>
                  <input type="text" v-model="actualSurveyDrivingType" :readonly="readStatus" />
                </td>
                <td class="required">기타 구동방식 기재</td>
                <td>
                  <input type="text" v-model="actualSurveyDrivingTypeOuters" :readonly="readStatus" />
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <div class="mt5">
                    <p class="required mb5">기타 특이사항 상세 기제</p>
                    <textarea
                      v-model="actualSurveySignificantOuters"
                      :readonly="readStatus"
                      placeholder="설치 특이환경 및 고객 협의 필요 사항"
                    ></textarea>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <div class="mt5">
                    <p class="required mb5">종합 의견</p>
                    <textarea v-model="actualSurveyOpinion" :readonly="readStatus" placeholder="과고형일 경우 적합성 등"></textarea>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <!-- 알럿 -->
          <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
          <!-- 사진파일 삭제 컨펌 -->
          <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
        </section>
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
import PullDownNum from "@/components/form/PullDownNum.vue";
import CheckBox from "@/components/form/CheckBox.vue";
import alim from "@/components/dialog/Alim.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import confirm from "@/components/dialog/Confirm.vue";
import thumbnailModal from "@/components/modal/common/Thumbnail";
import { getPopupOpt } from "@/utils/modal";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
export default {
  components: {
    modalWrap,
    DatePicker,
    PullDown,
    PullDownNum,
    CheckBox,
    alim,
    confirm,
  },
  mixins: [loading, alimMixin, deleteMixin],
  props: ["id", "AllRead"],
  data() {
    return {
      prospectiveCustomerSid: "",
      prospectiveCustomerStatusName: "",
      prospectiveCustomerStoreKindName: "",
      prospectiveCustomerDate: "",
      prospectiveCustomerStoreName: "",
      prospectiveCustomerStoreNationName: "",
      prospectiveCustomerStoreArea: "",
      interbridEmployeeSid: "",
      interbridEmployeeName: "",
      companySid: "",
      companyName: "",
      companyPersonSid: "",
      companyPersonName: "",
      prospectiveCustomerName: "",
      prospectiveCustomerHp: "",
      prospectiveCustomerZipCode: "",
      prospectiveCustomerAddress1: "",
      prospectiveCustomerAddress2: "",
      prospectiveCustomerAnalyzeVolumeName: "",
      prospectiveCustomerAnalyzeLocation: "",
      prospectiveCustomerAnalyzeLocationName: "",
      prospectiveCustomerFloatingPopulation20: "",
      prospectiveCustomerFloatingPopulation30: "",
      prospectiveCustomerFloatingPopulation40: "",
      prospectiveCustomerFloatingPopulation50: "",
      prospectiveCustomerMemo: "",
      prospectiveCustomerConsultationMemo: "",
      prospectiveCustomerSurveyDate: "",
      prospectiveCustomerEquipPlanDate: "",
      prospectiveCustomerConsultationDate: "",
      prospectiveCustomerWindowTintingDate: "",
      prospectiveCustomerEquipCompleteDate: "",
      actualSurveySid: "",
      actualSurveyDate: "",
      actualSurveyName: "",
      actualSurveyGlassTypeName: "",
      actualSurveyGlassType: "",
      actualSurveyStatusName: "",
      actualSurveyStatus: "",
      actualSurveyFilmSize: "",
      actualSurveyOrderFilmSize1: "",
      actualSurveyOrderFilmCount1: "",
      actualSurveyOrderFilmTerminal1: "",
      actualSurveyOrderFilmSize2: "",
      actualSurveyOrderFilmCount2: "",
      actualSurveyOrderFilmTerminal2: "",
      actualSurveyOrderFilmSize3: "",
      actualSurveyOrderFilmCount3: "",
      actualSurveyOrderFilmTerminal3: "",
      actualSurveyOrderFilmSize4: "",
      actualSurveyOrderFilmCount4: "",
      actualSurveyOrderFilmTerminal4: "",
      actualSurveySpecialConstruction: "",
      actualSurveySpecialConstructionName: "",
      actualSurveyGlassSurface: "",
      actualSurveyFrameColor: "",
      actualSurveyWindowTintingEqup: "",
      actualSurveyWindowTintingEqupName: "",
      actualSurveySilliconColor: "",
      actualSurveyVideoPreferencias: "",
      actualSurveyVideoPreferenciasName: "",
      actualSurveyVideoProjectionArea: "",
      actualSurveyCeilingHeight: "",
      actualSurveyProjectionDistance: "",
      actualSurveyProjectModel: "",
      actualSurveyProjectModelName: "",
      actualSurveyProjectEqupCount: "",
      actualSurveyProjectLensOption: "Y",
      actualSurveyProjectEqupType: "",
      actualSurveyCeilingType: "",
      actualSurveyTrafficSensorPosition: "",
      actualSurveyCardinalPoints: "",
      actualSurveyIntensityIllumination: "",
      actualSurveyWeather: "",
      actualSurveyVideoFormal: "",
      actualSurveyVideoFormalName: "",
      actualSurveyFilmFinishingsType: "",
      actualSurveyControllerPosition: "",
      actualSurveyElectricWiring: "",
      actualSurveyElectricWiringType: "",
      actualSurveyDrivingType: "",
      actualSurveyDrivingTypeOuters: "",
      actualSurveySignificantOuters: "",
      actualSurveyOpinion: "",
      actualSurveyCeilingTypeEtc: "",
      actualSurveyIntensityIlluminationOut: "",
      etc: "",
      file: [],
      message: true,
      delId: "",
      //풀다운 코드
      glassTypeCode: "SYS21802B029",
      statusCode: "SYS21804B001",
      filmNumCode: "SYS21806B001",
      specialCode: "SYS21802B033",
      tintingCode: "SYS21802B039",
      videoCode: "SYS21802B042",
      modelCode: "SYS21802B046",
      countCode: "SYS21802B058",
      installCode: "SYS21802B059",
      selfCode: "SYS21802B067",
      //풀다운 넘버일 경우
      num: true,

      readStatus: false,
      url: process.env.VUE_APP_API,
    };
  },
  computed: {
    ...mapGetters("actualSurvey", ["getActualSurveyDetail", "getActualSurveyUpdateResult"]),
    ...mapGetters("common", ["fileDeleteResult"]),
  },
  mounted() {
    if (this.AllRead) {
      this.readStatus = true;
    }
    this.reload(this.id);
  },
  methods: {
    async reload(id) {
      if (id === undefined || id.length === 0) {
        id = this.actualSurveySid;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("actualSurvey/ACTUALSURVEY_DETAIL", id);
        if (this.getActualSurveyDetail.channeltuneApiResult.errorCode == 200) {
          const actualServey = this.getActualSurveyDetail.channeltuneApiResult.actualSurvey;
          if (
            actualServey.actualSurveySilliconColor !== "검정색" &&
            actualServey.actualSurveySilliconColor !== "회색" &&
            actualServey.actualSurveySilliconColor !== "흰색"
          ) {
            this.actualSurveySilliconColor = "기타";
            this.etc = actualServey.actualSurveySilliconColor;
          } else {
            this.actualSurveySilliconColor = actualServey.actualSurveySilliconColor;
          }
          this.prospectiveCustomerSid = actualServey.prospectiveCustomerSid;
          this.prospectiveCustomerStatusName = actualServey.prospectiveCustomerStatusName;
          this.prospectiveCustomerStoreKindName = actualServey.prospectiveCustomerStoreKindName;
          this.prospectiveCustomerDate = actualServey.prospectiveCustomerDate;
          this.prospectiveCustomerStoreName = actualServey.prospectiveCustomerStoreName;
          this.prospectiveCustomerStoreNationName = actualServey.prospectiveCustomerStoreNationName;
          this.prospectiveCustomerStoreArea = actualServey.prospectiveCustomerStoreArea;
          this.interbridEmployeeSid = actualServey.interbridEmployeeSid;
          this.interbridEmployeeName = actualServey.interbridEmployeeName;
          this.companySid = actualServey.companySid;
          this.companyName = actualServey.companyName;
          this.companyPersonSid = actualServey.companyPersonSid;
          this.companyPersonName = actualServey.companyPersonName;
          this.prospectiveCustomerName = actualServey.prospectiveCustomerName;
          this.prospectiveCustomerHp = actualServey.prospectiveCustomerHp;
          this.prospectiveCustomerZipCode = actualServey.prospectiveCustomerZipCode;
          this.prospectiveCustomerAddress1 = actualServey.prospectiveCustomerAddress1;
          this.prospectiveCustomerAddress2 = actualServey.prospectiveCustomerAddress2;
          this.prospectiveCustomerAnalyzeVolumeName = actualServey.prospectiveCustomerAnalyzeVolumeName;
          this.prospectiveCustomerAnalyzeLocation = actualServey.prospectiveCustomerAnalyzeLocation;
          this.prospectiveCustomerAnalyzeLocationName = actualServey.prospectiveCustomerAnalyzeLocationName;
          this.prospectiveCustomerFloatingPopulation20 = actualServey.prospectiveCustomerFloatingPopulation20;
          this.prospectiveCustomerFloatingPopulation30 = actualServey.prospectiveCustomerFloatingPopulation30;
          this.prospectiveCustomerFloatingPopulation40 = actualServey.prospectiveCustomerFloatingPopulation40;
          this.prospectiveCustomerFloatingPopulation50 = actualServey.prospectiveCustomerFloatingPopulation50;
          this.prospectiveCustomerMemo = actualServey.prospectiveCustomerMemo;
          this.prospectiveCustomerConsultationMemo = actualServey.prospectiveCustomerConsultationMemo;
          this.prospectiveCustomerSurveyDate = actualServey.prospectiveCustomerSurveyDate;
          this.prospectiveCustomerEquipPlanDate = actualServey.prospectiveCustomerEquipPlanDate;
          this.prospectiveCustomerConsultationDate = actualServey.prospectiveCustomerConsultationDate;
          this.prospectiveCustomerWindowTintingDate = actualServey.prospectiveCustomerWindowTintingDate;
          this.prospectiveCustomerEquipCompleteDate = actualServey.prospectiveCustomerEquipCompleteDate;
          this.actualSurveySid = actualServey.actualSurveySid;
          this.actualSurveyDate = actualServey.actualSurveyDate;
          this.actualSurveyName = actualServey.actualSurveyName;
          this.actualSurveyGlassTypeName = actualServey.actualSurveyGlassTypeName;
          this.actualSurveyGlassType = actualServey.actualSurveyGlassType;
          this.actualSurveyStatusName = actualServey.actualSurveyStatusName;
          this.actualSurveyStatus = actualServey.actualSurveyStatus;
          this.actualSurveyFilmSize = actualServey.actualSurveyFilmSize;
          this.actualSurveyOrderFilmSize1 = actualServey.actualSurveyOrderFilmSize1;
          this.actualSurveyOrderFilmCount1 = actualServey.actualSurveyOrderFilmCount1;
          this.actualSurveyOrderFilmTerminal1 = actualServey.actualSurveyOrderFilmTerminal1;
          this.actualSurveyOrderFilmSize2 = actualServey.actualSurveyOrderFilmSize2;
          this.actualSurveyOrderFilmCount2 = actualServey.actualSurveyOrderFilmCount2;
          this.actualSurveyOrderFilmTerminal2 = actualServey.actualSurveyOrderFilmTerminal2;
          this.actualSurveyOrderFilmSize3 = actualServey.actualSurveyOrderFilmSize3;
          this.actualSurveyOrderFilmCount3 = actualServey.actualSurveyOrderFilmCount3;
          this.actualSurveyOrderFilmTerminal3 = actualServey.actualSurveyOrderFilmTerminal3;
          this.actualSurveyOrderFilmSize4 = actualServey.actualSurveyOrderFilmSize4;
          this.actualSurveyOrderFilmCount4 = actualServey.actualSurveyOrderFilmCount4;
          this.actualSurveyOrderFilmTerminal4 = actualServey.actualSurveyOrderFilmTerminal4;
          this.actualSurveySpecialConstruction = actualServey.actualSurveySpecialConstruction;
          this.actualSurveySpecialConstructionName = actualServey.actualSurveySpecialConstructionName;
          this.actualSurveyGlassSurface = actualServey.actualSurveyGlassSurface;
          this.actualSurveyFrameColor = actualServey.actualSurveyFrameColor;
          this.actualSurveyWindowTintingEqup = actualServey.actualSurveyWindowTintingEqup;
          this.actualSurveyWindowTintingEqupName = actualServey.actualSurveyWindowTintingEqupName;
          this.actualSurveyVideoPreferencias = actualServey.actualSurveyVideoPreferencias;
          this.actualSurveyVideoPreferenciasName = actualServey.actualSurveyVideoPreferenciasName;
          this.actualSurveyVideoProjectionArea = actualServey.actualSurveyVideoProjectionArea;
          this.actualSurveyCeilingHeight = actualServey.actualSurveyCeilingHeight;
          this.actualSurveyProjectionDistance = actualServey.actualSurveyProjectionDistance;
          this.actualSurveyProjectModel = actualServey.actualSurveyProjectModel;
          this.actualSurveyProjectModelName = actualServey.actualSurveyProjectModelName;
          this.actualSurveyProjectEqupCount = actualServey.actualSurveyProjectEqupCount;
          this.actualSurveyProjectLensOption = actualServey.actualSurveyProjectLensOption;
          this.actualSurveyProjectEqupType = actualServey.actualSurveyProjectEqupType;
          this.actualSurveyCeilingType = actualServey.actualSurveyCeilingType;
          this.actualSurveyTrafficSensorPosition = actualServey.actualSurveyTrafficSensorPosition;
          this.actualSurveyCardinalPoints = actualServey.actualSurveyCardinalPoints;
          this.actualSurveyIntensityIllumination = actualServey.actualSurveyIntensityIllumination;
          this.actualSurveyWeather = actualServey.actualSurveyWeather;
          this.actualSurveyVideoFormal = actualServey.actualSurveyVideoFormal;
          this.actualSurveyVideoFormalName = actualServey.actualSurveyVideoFormalName;
          this.actualSurveyFilmFinishingsType = actualServey.actualSurveyFilmFinishingsType;
          this.actualSurveyControllerPosition = actualServey.actualSurveyControllerPosition;
          this.actualSurveyElectricWiring = actualServey.actualSurveyElectricWiring;
          this.actualSurveyElectricWiringType = actualServey.actualSurveyElectricWiringType;
          this.actualSurveyDrivingType = actualServey.actualSurveyDrivingType;
          this.actualSurveyDrivingTypeOuters = actualServey.actualSurveyDrivingTypeOuters;
          this.actualSurveySignificantOuters = actualServey.actualSurveySignificantOuters;
          this.actualSurveyOpinion = actualServey.actualSurveyOpinion;
          this.actualSurveyCeilingTypeEtc = actualServey.actualSurveyCeilingTypeEtc;
          this.actualSurveyIntensityIlluminationOut = actualServey.actualSurveyIntensityIlluminationOut;
          //img url
          this.file = [];
          actualServey.fileResult.forEach(row => {
            if (row.fileSid !== "") {
              this.file.push({ url: row.fileSid, name: row.fileFileName, fileExt: row.fileExt });
            }
          });
          this.file[0] === undefined ? (this.message = true) : (this.message = false);
        } else {
          this.alim(this.getActualSurveyDetail.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    close() {
      this.$emit("close");
    },
    async save() {
      if (this.actualSurveyStatus === "" || this.actualSurveyStatus == null) {
        this.alim("상태를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyDate === "" || this.actualSurveyDate == null) {
        this.alim("실측날짜를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyName === "" || this.actualSurveyName == null) {
        this.alim("실측자를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyGlassTypeName === "" || this.actualSurveyGlassTypeName == null) {
        this.alim("유리형태를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyFilmSize === "" || this.actualSurveyFilmSize == null) {
        this.alim("필름전체크기를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyOrderFilmSize1 === "" || this.actualSurveyOrderFilmSize1 == null) {
        this.alim("발주필름 A 사이즈를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyOrderFilmCount1 === "" || this.actualSurveyOrderFilmCount1 == null) {
        this.alim("발주필름 A 수량을 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyOrderFilmTerminal1 === "" || this.actualSurveyOrderFilmTerminal1 == null) {
        this.alim("발주필름 A 단자방향을 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveySpecialConstructionName === "" || this.actualSurveySpecialConstructionName == null) {
        this.alim("특수시공을 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyGlassSurface === "" || this.actualSurveyGlassSurface == null) {
        this.alim("유리표면상태를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyWindowTintingEqupName === "" || this.actualSurveyWindowTintingEqupName == null) {
        this.alim("선팅지 시공 여부를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyFrameColor === "" || this.actualSurveyFrameColor == null) {
        this.alim("프레임 컬러를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveySilliconColor === "" || this.actualSurveySilliconColor == null) {
        this.alim("실리콘 컬러를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyVideoPreferenciasName === "" || this.actualSurveyVideoPreferenciasName == null) {
        this.alim("영상설치환경을 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyVideoProjectionArea === "" || this.actualSurveyVideoProjectionArea == null) {
        this.alim("영상투사면적을 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyCeilingHeight === "" || this.actualSurveyCeilingHeight == null) {
        this.alim("천고를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyProjectionDistance === "" || this.actualSurveyProjectionDistance == null) {
        this.alim("투사거리를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyProjectModelName === "" || this.actualSurveyProjectModelName == null) {
        this.alim("프로젝터 모델을 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyProjectLensOption === "" || this.actualSurveyProjectLensOption == null) {
        this.alim("옵션렌즈 사용여부를 선택해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyProjectEqupCount === "" || this.actualSurveyProjectEqupCount == null) {
        this.alim("프로젝터 설치대수를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyCeilingType === "" || this.actualSurveyCeilingType == null) {
        this.alim("천정소재를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyTrafficSensorPosition === "" || this.actualSurveyTrafficSensorPosition == null) {
        this.alim("트래픽센서 설치 위치를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyCardinalPoints === "" || this.actualSurveyCardinalPoints == null) {
        this.alim("방위를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyIntensityIllumination === "" || this.actualSurveyIntensityIllumination == null) {
        this.alim("실내조도를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyIntensityIlluminationOut === "" || this.actualSurveyIntensityIlluminationOut == null) {
        this.alim("실외조도를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyWeather === "" || this.actualSurveyWeather == null) {
        this.alim("실측일 날씨를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyVideoFormalName === "" || this.actualSurveyVideoFormalName == null) {
        this.alim("매장 자체 영상 보유여부를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyFilmFinishingsType === "" || this.actualSurveyFilmFinishingsType == null) {
        this.alim("필름 마감 방법을 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyControllerPosition === "" || this.actualSurveyControllerPosition == null) {
        this.alim("콘트롤러 위치를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyElectricWiring === "" || this.actualSurveyElectricWiring == null) {
        this.alim("전기배선 상세 설명을 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyElectricWiringType === "" || this.actualSurveyElectricWiringType == null) {
        this.alim("배선 방식 및 필요 길이를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyDrivingType === "" || this.actualSurveyDrivingType == null) {
        this.alim("구동방식을 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyDrivingTypeOuters === "" || this.actualSurveyDrivingTypeOuters == null) {
        this.alim("기타 구동방식를 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveySignificantOuters === "" || this.actualSurveySignificantOuters == null) {
        this.alim("기타 특이사항을 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.actualSurveyOpinion === "" || this.actualSurveyOpinion == null) {
        this.alim("종합 의견을 입력해주세요.", this.errorColor);
        return false;
      }
      let color = "";
      if (this.actualSurveySilliconColor === "기타") {
        color = this.etc;
      } else {
        color = this.actualSurveySilliconColor;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("actualSurvey/ACTUALSURVEY_UPDATE", {
          prospectiveCustomerSid: this.prospectiveCustomerSid,
          actualSurveySid: this.actualSurveySid,
          actualSurveyDate: this.actualSurveyDate,
          actualSurveyName: this.actualSurveyName,
          actualSurveyGlassTypeName: this.actualSurveyGlassTypeName,
          actualSurveyGlassType: this.actualSurveyGlassType,
          actualSurveyStatusName: this.actualSurveyStatusName,
          actualSurveyStatus: this.actualSurveyStatus,
          actualSurveyFilmSize: this.actualSurveyFilmSize,
          actualSurveyOrderFilmSize1: this.actualSurveyOrderFilmSize1,
          actualSurveyOrderFilmCount1: this.actualSurveyOrderFilmCount1,
          actualSurveyOrderFilmTerminal1: this.actualSurveyOrderFilmTerminal1,
          actualSurveyOrderFilmSize2: this.actualSurveyOrderFilmSize2,
          actualSurveyOrderFilmCount2: this.actualSurveyOrderFilmCount2,
          actualSurveyOrderFilmTerminal2: this.actualSurveyOrderFilmTerminal2,
          actualSurveyOrderFilmSize3: this.actualSurveyOrderFilmSize3,
          actualSurveyOrderFilmCount3: this.actualSurveyOrderFilmCount3,
          actualSurveyOrderFilmTerminal3: this.actualSurveyOrderFilmTerminal3,
          actualSurveyOrderFilmSize4: this.actualSurveyOrderFilmSize4,
          actualSurveyOrderFilmCount4: this.actualSurveyOrderFilmCount4,
          actualSurveyOrderFilmTerminal4: this.actualSurveyOrderFilmTerminal4,
          actualSurveySpecialConstruction: this.actualSurveySpecialConstruction,
          actualSurveySpecialConstructionName: this.actualSurveySpecialConstructionName,
          actualSurveyGlassSurface: this.actualSurveyGlassSurface,
          actualSurveyFrameColor: this.actualSurveyFrameColor,
          actualSurveyWindowTintingEqup: this.actualSurveyWindowTintingEqup,
          actualSurveyWindowTintingEqupName: this.actualSurveyWindowTintingEqupName,
          actualSurveySilliconColor: color,
          actualSurveyVideoPreferencias: this.actualSurveyVideoPreferencias,
          actualSurveyVideoPreferenciasName: this.actualSurveyVideoPreferenciasName,
          actualSurveyVideoProjectionArea: this.actualSurveyVideoProjectionArea,
          actualSurveyCeilingHeight: this.actualSurveyCeilingHeight,
          actualSurveyProjectionDistance: this.actualSurveyProjectionDistance,
          actualSurveyProjectModel: this.actualSurveyProjectModel,
          actualSurveyProjectModelName: this.actualSurveyProjectModelName,
          actualSurveyProjectEqupCount: this.actualSurveyProjectEqupCount,
          actualSurveyProjectLensOption: this.actualSurveyProjectLensOption,
          actualSurveyProjectEqupType: this.actualSurveyProjectEqupType,
          actualSurveyCeilingType: this.actualSurveyCeilingType,
          actualSurveyTrafficSensorPosition: this.actualSurveyTrafficSensorPosition,
          actualSurveyCardinalPoints: this.actualSurveyCardinalPoints,
          actualSurveyIntensityIllumination: this.actualSurveyIntensityIllumination,
          actualSurveyWeather: this.actualSurveyWeather,
          actualSurveyVideoFormal: this.actualSurveyVideoFormal,
          actualSurveyVideoFormalName: this.actualSurveyVideoFormalName,
          actualSurveyFilmFinishingsType: this.actualSurveyFilmFinishingsType,
          actualSurveyControllerPosition: this.actualSurveyControllerPosition,
          actualSurveyElectricWiring: this.actualSurveyElectricWiring,
          actualSurveyElectricWiringType: this.actualSurveyElectricWiringType,
          actualSurveyDrivingType: this.actualSurveyDrivingType,
          actualSurveyDrivingTypeOuters: this.actualSurveyDrivingTypeOuters,
          actualSurveySignificantOuters: this.actualSurveySignificantOuters,
          actualSurveyOpinion: this.actualSurveyOpinion,
          actualSurveyCeilingTypeEtc: this.actualSurveyCeilingTypeEtc,
          actualSurveyIntensityIlluminationOut: this.actualSurveyIntensityIlluminationOut,
        });
        if (this.getActualSurveyUpdateResult.channeltuneApiResult.errorCode == 200) {
          this.alim("저장 되었습니다.", this.successColor);
          this.$attrs.update();
        } else {
          this.alim(this.getActualSurveyUpdateResult.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //날짜 입력 emit
    actualSurveyDateProp(date) {
      this.actualSurveyDate = date;
    },
    //풀다운 데이터 emit
    actualSurveyGlassTypeNameProp(data) {
      this.actualSurveyGlassType = data.sysCodeSid;
      this.actualSurveyGlassTypeName = data.sysCodeName;
    },
    actualSurveyStatusNameProp(data) {
      this.actualSurveyStatus = data.sysCodeSid;
      this.actualSurveyStatusName = data.sysCodeName;
    },
    actualSurveyOrderFilmCount1Prop(data) {
      this.actualSurveyOrderFilmCount1 = data;
    },
    actualSurveyOrderFilmCount2Prop(data) {
      this.actualSurveyOrderFilmCount2 = data;
    },
    actualSurveyOrderFilmCount3Prop(data) {
      this.actualSurveyOrderFilmCount3 = data;
    },
    actualSurveyOrderFilmCount4Prop(data) {
      this.actualSurveyOrderFilmCount4 = data;
    },
    actualSurveySpecialConstructionNameProp(data) {
      this.actualSurveySpecialConstruction = data.sysCodeSid;
      this.actualSurveySpecialConstructionName = data.sysCodeName;
    },
    actualSurveyWindowTintingEqupNameProp(data) {
      this.actualSurveyWindowTintingEqup = data.sysCodeSid;
      this.actualSurveyWindowTintingEqupName = data.sysCodeName;
    },
    actualSurveyVideoPreferenciasNameProp(data) {
      this.actualSurveyVideoPreferencias = data.sysCodeSid;
      this.actualSurveyVideoPreferenciasName = data.sysCodeName;
    },
    actualSurveyProjectModelNameProp(data) {
      this.actualSurveyProjectModel = data.sysCodeSid;
      this.actualSurveyProjectModelName = data.sysCodeName;
    },
    actualSurveyProjectEqupTypeProp(data) {
      this.actualSurveyProjectEqupType = data;
    },
    actualSurveyVideoFormalNameProp(data) {
      this.actualSurveyVideoFormal = data.sysCodeSid;
      this.actualSurveyVideoFormalName = data.sysCodeName;
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
              await this.reload(this.actualSurveySid);
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
    //썸네일 모달
    thumbnailModal(data) {
      const file = this.file;

      this.$modal.show(thumbnailModal, { updateData: this.reload, file, data }, getPopupOpt("thumbnailModal", "1000px", "auto", false));
    },
  },
};
</script>

<style lang="scss" scoped>
.v-application {
  justify-content: space-between;
  & .right-column {
    width: calc(40% - 5px);
    overflow-y: auto;
    max-height: 735px;
  }
  & .left-column {
    width: calc(60% - 5px);
    overflow-y: auto;
    max-height: 735px;
  }
  & .second-column {
    overflow-y: auto;
    max-height: 735px;
  }
  & .tbl-reg {
    & tr {
      & td {
        & .date {
          width: 100% !important;
        }
        & .etc {
          & input[type="text"] {
            width: 250px;
            margin-left: 20px;
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
