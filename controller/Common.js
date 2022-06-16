sap.ui.define([], function() {
	"use strict";
	// todo понять как записать @alias и @lends
	return {

		Summ: function(count,price) {
			return count*(+price);
		},

		/**
		 * Функция возвращающая массив вргументов полученный при разборе строки.
		 * @param {string} str Входящая строка: разделитель вида "/&amp;|&/i".
		 * @returns {Array} массив параметров.
		 */
		deserialize: function(str) {
			const pairs = str.split(/&amp;|&/i),
				h = {},
				options = options || {};
			for (var i = 0; i < pairs.length; i++) {
				var kv = pairs[i].split('=');

				kv[0] = decodeURIComponent(kv[0]);
				if (kv[0].indexOf("[]", kv[0].length - 3) > -1) {
					kv[0] = kv[0].slice(0, -2);
				}

				if (!$.isArray(h[kv[0]])) {
					h[kv[0]] = [];
				}
				h[kv[0]].push(decodeURIComponent(kv[1]));
			}
			return h;
		},

		/**
		 * Форматтер строки, возвращает число вида parseInt(sNumber, 10).
		 * @param {string} sNumber Входящая строка.
		 * @returns {number} число вида parseInt(sNumber, 10).
		 */

		formatterStringToInt: function(sNumber) {
			return parseInt(sNumber, 10);
		},

		/**
		 * Форматтер строки, возвращает число вида parseInt(sNumber, 10).
		 * @param {string} sNumber Входящая строка.
		 * @returns {number} число вида parseInt(sNumber, 10).
		 */

		stringToFloat: function(sNumber) {
			var nValue = sNumber ? parseFloat(sNumber.replace(",", '.')) : null;
			return nValue;
		},

		/**
		 * Форматтер даты {00MM.00DD.YYYY 00HH:00MM:00SS}.
		 * @param {Date} oDate объект Date().
		 * @returns {string} форматированная строки вида {00MM.00DD.YYYY 00HH:00MM:00SS}.
		 */

		getFormattedDate: function(oDate) {
			return ("00" + (oDate.getMonth() + 1)).slice(-2) + "." +
				("00" + oDate.getDate()).slice(-2) + "." +
				oDate.getFullYear() + " " +
				("00" + oDate.getHours()).slice(-2) + ":" +
				("00" + oDate.getMinutes()).slice(-2) + ":" +
				("00" + oDate.getSeconds()).slice(-2);
		},

		/**
		 * Функция возвращающая результат сравнения объектов (и их значений свойств), в случае если один из аргументов null или не является object возвращатся false.
		 * @param {object} a аргумент 1.
		 * @param {object} b аргумент 2.
		 * @returns {boolean} результат сравнения объектов, в случае если один из аргументов null или не является object возвращатся false.
		 */

		deepEqual: function(a, b) {
			if (a === b) {
				return true;
			}

			if (a == null || typeof(a) !== "object" ||
				b == null || typeof(b) !== "object") {
				return false;
			}

			var propertiesInA = 0,
				propertiesInB = 0;
			for (var property in a) {
				propertiesInA += 1;
			}
			for (var property in b) {
				propertiesInB += 1;
				if (!(property in a) || !this.deepEqual(a[property], b[property])) {
					return false;
				}
			}
			return propertiesInA === propertiesInB;
		},


		/**
		 * Форматтер для статуса цвета иконки условий оплаты. Вкладки Лимиты и Финансовая оценка.
		 * Нет условий оплаты - серый, есть только стандартные - синий, есть нестандартные - красный.
		 *
		 * @param paym_term_count
		 * @type int
		 * @description общее кол-во условий оплаты
		 *
		 * @param std_paym_count
		 * @type int
		 * @description кол-во стандартных условий
		 *
		 * @param non_std_paym_count
		 * @type int
		 * @description кол-во нестандартных условий
		 */
		paymentApprovalColor: function(paym_term_count, std_paym_count, non_std_paym_count, oOfferLimit, sCurrencyLimit) {
			var sColor = "#3F5161";

			if (paym_term_count > 0) {
				sColor = (non_std_paym_count > 0) ? "#ff2121" : "#427CAC";
			}

			return sColor;
		},

		/**
		 * Функция возвращающая обязательность свойств _fc, _ac.
		 * @param {number} sValue значение.
		 * @returns {boolean} результат сравнения.
		 */

		requiredFormatter: function(sValue) {
			switch (sValue) {
				case 7:
					return true;
				case 3:
					return false;
				case 1:
					return false;
				default:
					return false;
			}
		},

		/**
		 * Функция возвращающая доступность свойств _fc, _ac.
		 * @param {number} sValue значение.
		 * @returns {boolean} результат сравнения.
		 */

		enabledFormatter: function(sValue) {
			switch (sValue) {
				case 7:
					return true;
				case 3:
					return true;
				case 1:
					return false;
				default:
					return false;
			}
		},

		/**
		 * Функция возвращающая видимость свойств _fc, _ac.
		 * @param {number} sValue значение.
		 * @returns {boolean} результат сравнения.
		 */

		visibleFormatter: function(sValue) {
			switch (sValue) {
				case 7:
					return true;
				case 3:
					return true;
				case 1:
					return true;
				default:
					return false;
			}
		},

		/**
		 * Функция возвращающая видимость свойства deviation.
		 * @param {Date} work_plan Date work_plan.
		 * @param {Date} fact_date Date fact_date.
		 * @param {Date} deviation Date fact_date.
		 * @returns {boolean} результат видимости.
		 */

		deviationVisibleFormatter: function(work_plan, fact_date, deviation) {
			if (!!work_plan) {
				return !((new Date().getTime() < work_plan.getTime()) && !fact_date && !deviation);
			} else {
				return true;
			}
		},

		/**
		 * Функция возвращающая статус Error, Success, Warning, None.
		 * @param {string} sValue значение.
		 * @returns {string} статус Error, Success, Warning, None.
		 */
		//@TODO добавить в i18n
		statusTextFormatter: function(sValue) {
			switch (sValue) {
				case "E":
					return this.getText('draftStatusE');
				case "N":
					return this.getText('draftStatusN');
				default:
					return "";
			}
		},

		/**
		 * Функция возвращающая статус Error, Success, Warning, None.
		 * @param {string} sValue значение.
		 * @returns {string} статус Error, Success, Warning, None.
		 */
		statusFormatter: function(sValue) {
			switch (sValue) {
				case "E":
					return "Warning";
				case "A":
					return "Success";
				default:
					return "Error";
			}
		},

		/**
		 * Функция возвращающая статус Error, Success, Warning, None.
		 * @param {string} sValue значение.
		 * @returns {string} статус Error, Success, Warning, None.
		 */
		statusFormatterWorklist: function(sPmode) {
			var sStatus = 'None';
			if (sPmode === 'E'){
				sStatus = 'Warning';
			}
			// if(!bChainFlag){
			// 	sStatus = 'Success'
			// }
			// if(!bChainStatus){
			// 	sStatus = 'Success'
			// }
			return sStatus;
		},

		/**
		 * Функция возвращающая статус Error, Success, Warning, None.
		 * @param {string} sValue значение.
		 * @returns {string} статус Error, Success, Warning, None.
		 */
		statusFormatterCell: function(field,type) {
			// debugger
		},

		/**
		 * Функция возвращающая статус Error, Success, Warning, None.
		 * @param {string} sValue значение.
		 * @returns {string} статус Error, Success, Warning, None.
		 */
		smartStatusFormatter: function(sValue) {
			switch (sValue) {
				case "E":
					return "2";
				case "A":
					return "3";
				default:
					return "1";
			}
		},

		//Выделение КП на таблице мехов в области 2
		// если sValue = 1, то это ВП, если 2, то КП
		formatRowHighlight: function(sValue,IndMh1a){
			if(!!IndMh1a){
				return 'Warning';
			}else{
				if (!sValue){
					return 'None';
				} else {
					return sValue === '2' ? 'Information' : 'None';
				}
			}
		},
		//Выделение КП на таблице химии в области 2
		// если sValue = 1, то это ВП, если 2, то КП
		formatRowHighlightFromChemical: function(sValue,Header){
			if (!!Header){
				return 'None';
			} else {
				return sValue === '2' ? 'Information' : 'None';
			}
		},

		formatChainLogHighlight: function(sValue){
			switch (sValue) {
				case 'I':
					return 'Success';
				case 'W':
					return 'Warning';
				case 'E':
					return 'Error';
				default:
					return 'None'

			}
		},

		/**
		 * Функция возвращающая статус Error, Success, Warning, None.
		 * @param {number} iDeviation значение.
		 * @returns {string} статус Error, Success, Warning, None.
		 */

		deviationState: function(iDeviation) {
			if (iDeviation == 0) {
				return "None";
			} else if (iDeviation > 0 && iDeviation < 10) {
				return "Warning";
			} else if (iDeviation >= 10) {
				return "Error";
			} else {
				return "Success";
			}
		},

		/**
		 * Функция возвращающая определнный CustomNewsContent.
		 * @param {Date} dBaseDate значение.
		 * @param {Date} dFactDate значение.
		 * @param {number} dCurrentStep значение 1 ? 2.
		 * @returns {CustomNewsContent} возвращает объект CustomNewsContent.
		 */

		formatTimeLineTileClassesDependingOnPOStep: function(dBaseDate, dFactDate, dCurrentStep) {
			var iClass = 0;
			if (!dFactDate) {
				iClass = (dCurrentStep) ? 1 : 2;
			}
			return (this._CustomNewsContent.aClasses[iClass]);
		},

		/**
		 * Функция возвращающая определнный CustomNewsContent.
		 * @param {number} iDeviation значение.
		 * @returns {CustomNewsContent} возвращает объект CustomNewsContent.
		 */

		formatTimeLineDateExpirationStateText: function(iDeviation) {
			var iClass;
			if (iDeviation > 0) {
				iClass = (iDeviation <= 10) ? 3 : 4;
			}
			return (this._CustomNewsContent.aClasses[iClass]);
		},

		/**
		 * Функция возвращающая результат выполнения formatDate.
		 * @param {Date} dFactDate значение.
		 * @param {Date} dFocrastDate значение.
		 * @param {Date} dPurchPlan значение.
		 * @param {Date} dWorkPlan значение.
		 * @returns {function} возвращает результат выполнения функции formatDate вида (00DD.00MM.YYYY).
		 */

		chooseWhichDateToShowForTimeLine: function(dFactDate, dFocrastDate, dPurchPlan, dWorkPlan) {
			if (!!dFactDate) {
				return this.Common.formatDate(dFactDate);
			} else if (!!dFocrastDate) {
				return this.Common.formatDate(dFocrastDate);
			} else if (!!dPurchPlan) {
				return this.Common.formatDate(dPurchPlan);
			} else if (!!dWorkPlan) {
				return this.Common.formatDate(dWorkPlan);
			}
		},

		/**
		 * Функция возвращающая форматированную строку вида (00DD.00MM.YYYY) .
		 * @param {Date} oDate значение.
		 * @returns {string} возвращает форматированную строку вида (00DD.00MM.YYYY).
		 */

		formatDate: function(oDate) {
			return ("00" + oDate.getDate()).slice(-2) + "." +
				("00" + (oDate.getMonth() + 1)).slice(-2) + "." +
				oDate.getFullYear()
		},

		/**
		 * Функция возвращающая строку виду "StartDate - EndDate".
		 * @param {Date} oStartDate значение StartDate.
		 * @param {Date} oEndDate значение EndDate.
		 * @returns {string} возвращает строку виду "StartDate - EndDate".
		 */

		timeDisplay: function(oStartDate, oEndDate) {
			const dNewStartDate = this.formatDate(oStartDate);
			const dNewEndDate = this.formatDate(oEndDate);

			const sReturn = (oStartDate && oEndDate) ? (dNewStartDate + " - " + dNewEndDate) : null;
			return sReturn;
		},

		/**
		 * Функция возвращающая строку аргументов коллекции, каждый аргумент разделен ",".
		 * @param {Array} oCollection объект.
		 * @returns {string} возвращает строку аргументов коллекции, каждый аргумент разделен ",".
		 */

		fmtJoiner: function(oCollection) {
			var result = "";
			if (oCollection && oCollection.length) {
				result = oCollection.join(", ");
			}
			return result;
		},

		/**
		 * Функция возвращающая форматированный тип драфта.
		 * @param {object} oDraftAdministrativeData объект DraftAdministrativeData.
		 * @param {boolean} bIsActiveEntity значение IsActiveEntity.
		 * @param {boolean} bHasDraftEntity значение HasDraftEntity.
		 * @returns {sap.m.ObjectMarkerType} возвращает флаг типа sap.m.ObjectMarkerType.
		 */

		formatDraftType: function(oDraftAdministrativeData, bIsActiveEntity, bHasDraftEntity) {
			if (oDraftAdministrativeData && oDraftAdministrativeData.DraftUUID) {
				if (!bIsActiveEntity) {
					return sap.m.ObjectMarkerType.Draft;
				} else if (bHasDraftEntity) {
					return oDraftAdministrativeData.InProcessByUser ? sap.m.ObjectMarkerType.Locked : sap.m.ObjectMarkerType.Unsaved;
				}
			}
			return sap.m.ObjectMarkerType.Flagged;
		},

		/**
		 * Функция возвращающая форматированный тип видимости компонентов драфта.
		 * @param {object} oDraftAdministrativeData объект DraftAdministrativeData.
		 * @param {boolean} bIsActiveEntity значение IsActiveEntity.
		 * @returns {sap.m.ObjectMarkerVisibility} возвращает флаг типа sap.m.ObjectMarkerVisibility.
		 */

		formatDraftVisibility: function(oDraftAdministrativeData, bIsActiveEntity) {
			if (oDraftAdministrativeData && oDraftAdministrativeData.DraftUUID) {
				if (!bIsActiveEntity) {
					return sap.m.ObjectMarkerVisibility.TextOnly; //for Draft mode only the text will be shown
				}
			}
			return sap.m.ObjectMarkerVisibility.IconAndText; //Default text and icon
		},

		/**
		 * Функция возвращающая форматированный тип видимости компонента Line.
		 * @param {object} oDraftAdministrativeData объект DraftAdministrativeData.
		 * @returns {boolean} возвращает значение видимости.
		 */

		formatDraftLineItemVisible: function(oDraftAdministrativeData) {
			if (oDraftAdministrativeData && oDraftAdministrativeData.DraftUUID) {
				return true;
			}
			return false;
		},

		/**
		 * Функция возвращающая форматированный тип видимости компонента Line.
		 * @param {object} oDraftAdministrativeData объект DraftAdministrativeData.
		 * @param {boolean} bHasDraftEntity значение IsActiveEntity.
		 * @returns {string} возвращает значение sDraftOwnerDescription ("unsaved changes" or "locked").
		 */

		// Returns full user name or ID of owner of a draft with status "unsaved changes" or "locked" in the format "by full name" or "by UserId"
		// If the user names and IDs are not maintained we display for example "locked by another user"
		formatDraftOwner: function(oDraftAdministrativeData, bHasDraftEntity) {
			var sDraftOwnerDescription = "";
			if (oDraftAdministrativeData && oDraftAdministrativeData.DraftUUID && bHasDraftEntity) {
				var sUserDescription = oDraftAdministrativeData.InProcessByUserDescription || oDraftAdministrativeData.InProcessByUser || oDraftAdministrativeData.LastChangedByUserDescription || oDraftAdministrativeData.LastChangedByUser;
				if (sUserDescription) {
					sDraftOwnerDescription = this.getText("ST_DRAFT_OWNER", [sUserDescription]);
				} else {
					sDraftOwnerDescription = this.getText("ST_DRAFT_ANOTHER_USER");
				}
			}
			return sDraftOwnerDescription;
		},

		/**
		 * Функция возвращающая форматированный строку пользователя заблокировавшего или драфт объекта.
		 * @param {boolean} IsActiveEntity значение IsActiveEntity.
		 * @param {boolean} HasDraftEntity значение HasDraftEntity.
		 * @param {string} LockedBy значение LockedBy.
		 * @returns {string} возвращает значение ("DRAFT_OBJECT", "LOCKED_OBJECT" или "UNSAVED_CHANGES").
		 */

		formatDraftLockText: function(IsActiveEntity, HasDraftEntity, LockedBy) {
			if (!IsActiveEntity) {
				// current assumption: is my Draft as I don't see other's draft -> TODO: to be checked
				return this.getText("DRAFT_OBJECT");
			} else if (HasDraftEntity) {
				return this.getText(LockedBy ? "LOCKED_OBJECT" : "UNSAVED_CHANGES");
			} else {
				return ""; // not visible
			}
		},

		/**
		 * Функция возвращающая форматированный текст.
		 * @returns {string} возвращает форматированный текст.
		 */

		formatText: function() {
			var aArgs = Array.prototype.slice.call(arguments, 1);
			var sKey = arguments[0];
			if (!sKey) {
				return "";
			}
			if (aArgs.length > 0 && (aArgs[0] === null || aArgs[0] === undefined || aArgs[0] === "")) {
				if (aArgs.length > 3 && (aArgs[3] === null || aArgs[3] === undefined || aArgs[3] === "")) {
					return (aArgs.length > 2 && (aArgs[1] === null || aArgs[1] === undefined || aArgs[1] === "")) ?
						"" :
						aArgs[2];
				} else {
					return this.getText(sKey, aArgs[3]);
				}
			} else {
				return this.getText(sKey, aArgs[0]);
			}
		},

		/**
		 * Функция возвращающая строку src (название) иконки.
		 * @param {string} sValue значение.
		 * @returns {string} возвращает строку src (название) иконки.
		 */

		formatIcon: function(sValue) {
			if (true === sValue) {
				return 'sap-icon://accept'
			} else if (false === sValue) {
				return 'sap-icon://decline'
			} else {
				const iValue = parseInt(sValue, 10);
				switch (iValue) {
					case 1:
						return 'sap-icon://accept'
					case 2:
						return 'sap-icon://decline'
					default:
						return 'sap-icon://fob-watch'
				}
			}
		},

		/**
		 * Функция возвращающая цвет иконки.
		 * @param {string} sValue значение.
		 * @returns {string} возвращает цвет иконки.
		 */

		formatIconColor: function(sValue) {
			if (true === sValue) {
				return 'green'
			} else if (false === sValue) {
				return 'red'
			} else {
				const iValue = parseInt(sValue, 10);
				switch (iValue) {
					case 1:
						return 'green'
					case 2:
						return 'red'
					default:
						return 'black'
				}
			}
		},

		/**
		 * Функция возвращающая цвет иконки.
		 * @param {string} sValue значение.
		 * @returns {string} возвращает цвет иконки.
		 */

		formatIconColorSwitcherIdentically: function(sValue) {
			if (true === sValue) {
				return 'green'
			} else if (false === sValue) {
				return '#bb0000'
			} else {
				const iValue = parseInt(sValue, 10);
				switch (iValue) {
					case 1:
						return 'green'
					case 2:
						return '#bb0000'
					default:
						return 'black'
				}
			}
		},

		/**
		 * Функция возвращающая статус партнера: Error, Success, None.
		 * @param {string} sValue значение.
		 * @returns {string} возвращает статус Error, Success, None..
		 */

		formatPartnerStatusColor: function(sValue) {
			switch (sValue) {
				case "1":
					return "Success";
				case "2":
					return "None";
				case "3":
					return "Error";
				default:
					return "None";
			}
		},

		/**
		 * Функция возвращающая строку src "принять/отклонить" иконки.
		 * @param {string} sValue значение.
		 * @returns {string} возвращает строку src "принять/отклонить" иконки.
		 */

		formatAttendedIcon: function(sAttended) {
			if (sAttended) {
				return "sap-icon://accept";
			}
			return "sap-icon://decline";
		},

		//LinkedObjectFormatter
		//def 1.44 doesnt contains class "sap/suite/ui/commons/ProcessFlowNodeState"

		/**
		 * Функция возвращающая статус узла графического представления связных объектов (Neutral, Positive, Negative)
		 * @param {string} sValue значение.
		 * @returns {string} возвращает статус узла графического представления связных объектов.
		 */

		convertNodeStatusToState: function(sValue) {
			switch (sValue) {
				case "1":
					return "Neutral";
				case "2":
					return "Positive";
				case "3":
					return "Negative";
				default:
					return "Neutral";
			}
		},	

	};
});
