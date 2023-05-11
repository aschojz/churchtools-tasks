/**
 * 2022-10-19
 */
export type DateString = string;
/**
 * 2022-10-19T12:50:08Z
 */
export type ZuluDate = string;
/**
 *  2022-10-19T14:50:08+02:00
 */
export type UTCDate = string;

export type LoadingState = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';

export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export interface ErrorObj {
    args: { name: string; value: string };
    fieldId: string;
    message: string;
    messageKey: string;
}
export interface ApiErrorObj {
    args?: { name: string; value: string }[];
    errors?: ErrorObj[];
    message: string;
    messageKey?: string;
    translatedMessage?: string;
}
export interface ApiError {
    response: {
        data: { data: ApiErrorObj } | ApiErrorObj;
    };
}

interface CreatedType {
    createdDate: ZuluDate;
    createdPerson: { id: number };
}
export interface MetaType extends CreatedType {
    modifiedDate: ZuluDate;
    modifiedPerson: { id: number };
}

export interface PayloadPersonsGet {
    birthday_after?: DateString;
    birthday_before?: DateString;
    campus_ids?: number[];
    ids?: number[];
    is_archive?: boolean;
    limit?: number;
    page?: number;
    status_ids?: number[];
}
export interface Person {
    acceptedsecurity: string;
    addressAddition: string;
    baptisedBy: string;
    birthName: string;
    birthday: string;
    birthplace: string;
    campusId: number;
    canChat: boolean;
    chatActive: boolean;
    city: string;
    cmsUserId: string;
    country: string;
    dateOfBaptism: DateString;
    dateOfBelonging: DateString;
    dateOfEntry: DateString;
    dateOfResign: DateString;
    departmentIds: number[];
    editSecurityLevelForPerson: number;
    email: string;
    emails: [{ email: string; isDefault: boolean; contactLabelId: number }];
    familyImageUrl: string;
    familyStatusId: number;
    fax: string;
    firstContact: string;
    firstName: string;
    growPathId: number;
    guid: string;
    id: number;
    imageUrl: string;
    invitationStatus: string;
    isArchived: boolean;
    job: string;
    lastName: string;
    latitude: number;
    latitudeLoose: number;
    longitude: number;
    longitudeLoose: number;
    meta: MetaType;
    mobile: string;
    nationalityId: number;
    nickname: string;
    optigemId: string;
    phonePrivate: string;
    phoneWork: string;
    placeOfBaptism: string;
    privacyPolicyAgreement: { date: DateString; typeId: number; whoId: number };
    referredBy: string;
    referredTo: string;
    securityLevelForPerson: number;
    sexId: number;
    statusId: number;
    street: string;
    title: string;
    weddingDate: DateString;
    zip: string;
}

export interface PersonSetting {
    attribute: string;
    module:
        | 'churchcore'
        | 'churchdb'
        | 'finance'
        | 'global'
        | 'churchservice'
        | 'churchreport'
        | 'churchresource'
        | 'churchhome'
        | 'churchcheckin'
        | 'churchcal'
        | 'churchauth'
        | 'churchfinance';
    value: any;
}

export interface Permissions {
    churchcore: {
        'administer persons': boolean;
        'administer settings': boolean;
        'edit public relations': boolean;
        'edit translations': boolean;
        'invite persons': boolean;
        'simulate persons': boolean;
        'view logfile': boolean;
    };
    churchdb: {
        'administer global filters': boolean;
        'administer groups': boolean;
        'complex filter': boolean;
        'create person': boolean;
        'create print labels': boolean;
        'delete persons': boolean;
        'edit bulkletter': boolean;
        'edit groups': boolean;
        'edit masterdata': boolean;
        'edit relations': boolean;
        'export data': boolean;
        'push/pull archive': boolean;
        'security level edit own data': number[];
        'security level group': number[];
        'security level person': number[];
        'security level view own data': number[];
        'send sms': boolean;
        view: boolean;
        'view alldata': number[];
        'view archive': boolean;
        'view birthdaylist': boolean;
        'view comments': number[];
        'view group': number[];
        'view grouptype': number[];
        'view history': boolean;
        'view memberliste': boolean;
        'view station': number[];
        'view statistics': boolean;
        'view tags': boolean;
        'write access': boolean;
    };
    churchcal: {
        'admin church category': boolean;
        'admin group category': boolean;
        'admin personal category': boolean;
        'assistance mode': boolean;
        'create group category': boolean;
        'create personal category': boolean;
        'edit calendar entry template': number[];
        'edit category': number[];
        view: boolean;
        'view category': number[];
    };
    churchresource: {
        'administer bookings': number[];
        'assistance mode': boolean;
        'create bookings': number[];
        'create virtual bookings': boolean;
        'edit masterdata': boolean;
        view: boolean;
        'view resource': number[];
    };
    churchservice: {
        'edit agenda templates': number[];
        'edit agenda': number[];
        'edit events': number[];
        'edit fact': number[];
        'edit masterdata': boolean;
        'edit servicegroup': number[];
        'edit songcategory': number[];
        'edit template': boolean;
        'export facts': boolean;
        'manage absent': boolean;
        'use ccli': boolean;
        view: boolean;
        'view agenda': number[];
        'view events': number[];
        'view fact': number[];
        'view history': boolean;
        'view servicegroup': number[];
        'view song statistics': boolean;
        'view songcategory': number[];
    };
    churchcheckin: {
        'create person': boolean;
        'edit masterdata': boolean;
        view: boolean;
    };
    churchwiki: {
        'edit category': number[];
        'edit masterdata': boolean;
        view: boolean;
        'view category': number[];
    };
    finance: {
        'edit accounting period': number[];
        'edit masterdata': boolean;
        view: boolean;
        'view accounting period': number[];
    };
}

export interface InternalGroupPermissions {
    churchdb: {
        '+see group': number;
        '+edit group infos': boolean;
        '+edit group basic settings': boolean;
        '+edit group hierachy': boolean;
        '+create group': boolean;
        '+see hidden group': boolean;
        '+see group tags': boolean;
        '+see persons': number;
        '+see groupmemberfields': number;
        '+admin group fields': boolean;
        '+edit own groupmemberfields': boolean;
        '+edit groupmemberstatus': boolean;
        '+add person': boolean;
        '+remove from group': boolean;
        '+export group members': boolean;
        '+mail group members': boolean;
        '+admin followup': boolean;
        '+do followup': boolean;
        '+admin meetings': boolean;
        '+do group meeting': boolean;
        '+admin group chat': boolean;
        '+get emails': boolean;
        '+admin automatic emails': boolean;
    };
}

export type MessageType = 'SUCCESS' | 'ERROR' | 'INFO' | 'WARNING';
export interface Toast {
    canBeClosed?: boolean;
    message: string;
    note?: string;
    timeout?: number;
    type: MessageType;
    id: string;
}

export interface PersonMasterData {
    ageGroups: AgeGroup[];
    campuses: Campus[];
    contactLabels: ContactLabel[];
    departments: Department[];
    followUps: FollowUp[];
    followUpIntervals: FollowUpInterval[];
    groupCategories: GroupCategory[];
    groupStatuses: GroupStatus[];
    groupTypes: GroupType[];
    growPaths: GrowPath[];
    groupMeetingTemplates: GroupMeetingTemplate[];
    relationshipTypes: RelationshipType[];
    roles: Role[];
    statuses: Status[];
    targetGroups: TargetGroup[];
}
export interface EventMasterData {
    absenceReasons: AbsenceReason[];
    songCategories: SongCategory[];
    serviceGroups: ServiceGroup[];
    services: Service[];
}
export interface ResourceMasterData {
    resourceTypes: ResourceType[];
    resources: Resource[];
}

export interface FinanceMasterData {
    accountClasses: AccountClass[];
    accountGroups: AccountGroup[];
    accountTypes: AccountType[];
    accountingPeriods: AccountingPeriod[];
    accounts: Account[];
    clients: Client[];
    costCenters: CostCenter[];
    taxRates: TaxRate[];
    taxTypes: TaxType[];
    transactionPurposes: TransactionPurpose[];
}
export interface FinancePermissions {
    editMasterData: boolean;
    canViewDonators: boolean;
    canViewTransactions: boolean;
    canViewBudgets: boolean;
    canViewReports: boolean;
}

export interface BaseMasterdata {
    id: number;
    name: string;
    nameTranslated: string;
    sortKey: number;
}

export interface AgeGroup extends BaseMasterdata {
    end: number;
    start: number;
}

export interface ContactLabel extends BaseMasterdata {
    isDefault: boolean;
}

export type Department = BaseMasterdata;
export type Weekday = BaseMasterdata;

export interface FollowUp {
    commentViewerId: number;
    id: number;
    name: string;
    nameTranslated: string;
}
export interface FollowUpInterval {
    count: number;
    daysDiff: number;
    followUpId: number;
    id: number;
    info: string;
}

export type GroupCategory = BaseMasterdata;

export interface GroupMeetingTemplate {
    id: number;
    name: string;
    template: string;
}

export type GroupStatus = BaseMasterdata;

export interface GroupType extends BaseMasterdata {
    availableForNewPerson: boolean;
    permissionDepth: number;
    isLeaderNecessary: boolean;
    shorty: string;
}

export interface GrowPath extends BaseMasterdata {
    color: string;
}

export interface RelationshipType extends BaseMasterdata {
    securityLevelId: number;
    degreeNameA: string;
    degreeNameB: string;
    includeInExport: boolean;
    exportTitle: string;
    functionKeys: string[];
}

export interface Role extends BaseMasterdata {
    groupTypeId: number;
    groupTypeRoleId: number;
    growPathId: null | number;
    isDefault: boolean;
    isHidden: boolean;
    shorty: string;
    type: 'participant' | 'leader';
}

export type Status = BaseMasterdata;

export type TargetGroup = BaseMasterdata;

export type AbsenceReason = BaseMasterdata;
export interface SongCategory extends BaseMasterdata {
    campusId: number;
}
export interface ServiceGroup extends BaseMasterdata {
    campusId: number;
    onlyVisibleInCampusFilter: boolean;
    viewAll: boolean;
}

export interface Service extends BaseMasterdata {
    allowChat: boolean;
    allowControlLiveAgenda: boolean;
    allowDecline: boolean;
    allowExchange: boolean;
    calTextTemplate: string;
    comment: string;
    commentOnConfirmation: boolean;
    groupIds: string;
    hidePersonName: boolean;
    sendReminderMails: boolean;
    sendServiceRequestEmails: boolean;
    serviceGroupId: number;
    standard: boolean;
    tagIds: string;
}

export interface ResourceType extends BaseMasterdata {
    campusId: number;
}
export interface Resource extends BaseMasterdata {
    resourceTypeId: number;
    location: string;
    iCalLocation: string;
    isAutoAccept: boolean;
    doesRequireCalEntry: boolean;
    isVirtual: boolean;
    adminIds: number[];
    randomString: string;
}

export interface Account {
    accountGroupId: number;
    accountingPeriodId: number;
    balance: number;
    id: number;
    isDonationAccount: boolean;
    isOpeningBalanceAccount: boolean;
    meta: MetaType;
    name: string;
    number: string;
    permissions: {
        allowPosting: boolean;
    };
    taxRateId?: number;
    iban?: string;
}

export interface CostCenter {
    accountingPeriodId: number;
    budget: number;
    budgetBalance: number;
    budgetLastPeriod: number;
    budgetSpent: number;
    group: GroupDomainObjectType;
    id: number;
    meta: MetaType;
    name: string;
    number: string;
}

export interface TaxRate {
    accountId: number;
    id: number;
    meta: MetaType;
    note: string;
    rate: number;
    taxTypeId: number;
}

export interface TaxType {
    id: number;
    meta: MetaType;
    name: string;
    sortKey: number;
}

export interface TransactionPurpose {
    accountIds: number[];
    costCenterId: number;
    id: number;
    isIncome: boolean;
    meta: MetaType;
    name: string;
    purposeAccountId: number;
    sortKey: number;
}

export interface Client {
    city?: string;
    email?: string;
    id: number;
    meta: MetaType;
    name: string;
    phone?: string;
    postalCode?: string;
    sortKey: number;
    street?: string;
    treasurer?: string;
    treasurerId?: number;
}

export interface AccountingPeriod {
    clientId: number;
    donationReceiptsCreated?: string;
    endDate: string;
    id: number;
    isClosed: boolean;
    meta: MetaType;
    permissions: {
        canUseExpertMode: boolean;
        'edit accounting period': boolean;
    };
    startDate: string;
}
export interface AccountType {
    balanceType: 'assets' | 'liabilities';
    id: number;
    isBalanceAccount: boolean;
    meta: MetaType;
    name: string;
    sortKey: number;
}
export interface AccountGroup {
    accountClassId: number;
    id: number;
    isCashAssetAccount: boolean;
    meta: MetaType;
    name: string;
    sortKey: number;
}
export interface AccountClass {
    accountTypeId: number;
    id: number;
    includeProfitLoss: boolean;
    meta: MetaType;
    name: string;
    sortKey: number;
}

export interface Tag {
    count: number;
    id: number;
    name: string;
}
export type TagType = 'persons' | 'song';

export interface Member {
    comment: string;
    fields: any[];
    followUpDiffDays: number;
    followUpStep: number;
    getFollowUpUnsuccessfulBackGroupId: number;
    groupMemberStatus: MemberStatus;
    groupTypeRoleId: number;
    memberEndDate?: DateString;
    memberStartDate: DateString;
    person: PersonDomainObjectType;
    personFields: any[];
    personId: number;
    waitinglistPosition?: number;
}
export type MemberStatus = 'active' | 'requested' | 'to_delete' | 'waiting';

export type GeneralDomainObjectType<DomainType, DomainAttributes> = {
    apiUrl: string;
    domainAttributes: DomainAttributes;
    domainIdentifier: string;
    domainType: DomainType;
    frontendUrl: string;
    infos?: string[];
    imageUrl?: string;
    title: string;
    icon?: string;
    type?: 'action' | 'domainObject';
};

export type PersonDomainObjectType = GeneralDomainObjectType<
    'person',
    {
        firstName: string;
        lastName: string;
        guid: string;
    }
>;

export type ImageDomainObjectType = GeneralDomainObjectType<
    'image',
    Record<string, never>
>;
export type GroupDomainObjectType = GeneralDomainObjectType<
    'group',
    { note: string }
>;
export type SongDomainObjectType = GeneralDomainObjectType<
    'song',
    Record<string, never>
>;
export type WikiDomainObjectType = GeneralDomainObjectType<
    'wiki',
    Record<string, never>
>;
export type WikiPageDomainObjectType = GeneralDomainObjectType<
    'wiki_page',
    { wikiCategoryId: number }
>;
export type LogoDomainObjectType = GeneralDomainObjectType<
    'logo',
    Record<string, never>
>;
export type FileDomainObjectType = GeneralDomainObjectType<
    'file',
    Record<string, never>
>;
export type CalendarDomainObjectType = GeneralDomainObjectType<
    'calendar',
    { campusName: string }
>;
export type GroupHomepageDomainObjectType = GeneralDomainObjectType<
    'grouphomepage',
    { childGroupIds: number[] }
>;

export type DomainObjectType =
    | PersonDomainObjectType
    | GroupDomainObjectType
    | SongDomainObjectType
    | WikiDomainObjectType
    | WikiPageDomainObjectType
    | FileDomainObjectType
    | LogoDomainObjectType
    | ImageDomainObjectType
    | GroupHomepageDomainObjectType
    | CalendarDomainObjectType;

export type ChatStatus = 'NOT_STARTED' | 'STARTING' | 'STARTED' | 'STOPPED';
export interface Group {
    id: number;
    guid: string;
    name: string;
    securityLevelForGroup: number;
    permissions: {
        useChat: boolean;
        startChat: boolean;
    };
    information: {
        ageGroupIds: number[];
        campusId: number;
        chatStatus: ChatStatus;
        color: string;
        dateOfFoundation: DateString;
        endDate: DateString;
        groupCategoryId: number;
        groupHomepageUrl: string;
        groupStatusId: number;
        groupTypeId: number;
        imageUrl: string;
        maxMembers: number;
        meetingTime: string;
        note: string;
        targetGroupId: number;
        weekday: number;
    };
    settings: {
        allowChildRegistration: boolean;
        allowOtherRegistration: boolean;
        allowSameEmailRegistration: boolean;
        allowSpouseRegistration: boolean;
        allowWaitinglist: boolean;
        autoAccept: boolean;
        automaticMoveUp: boolean;
        groupMeeting: {
            autoCreate: boolean;
            templateId: number;
        };
        informLeader: boolean;
        inStatistic: boolean;
        isHidden: boolean;
        isOpenForMembers: boolean;
        isPublic: boolean;
        newMember: {
            campusId: number;
            statusId: number;
            departmentId: number;
        };
        qrCodeCheckin: boolean;
        visibility: 'hidden' | 'public' | 'restricted' | 'intern';
        waitinglistMaxPersons: number;
    };
    followUp: {
        commentViewerId: number;
        id: number;
        name: string;
        nameTranslated: string;
    };
    roles: MemberRole[];
}

export interface MemberRole extends Role {
    groupTypeRoleId: number;
    groupTypeId: number;
    canReadChat: boolean;
    canWriteChat: boolean;
    forceTwoFactorAuth: boolean;
    isActive: boolean;
    receiveQRCode: boolean;
}

export interface GroupOfPerson {
    group: GroupDomainObjectType;
    groupTypeRoleId: number;
    memberStartDate: DateString;
}

export interface PayloadGroupsGet {
    agegroup_ids?: number[];
    campus_ids?: number[];
    group_category_ids?: number[];
    group_status_ids?: number[];
    group_type_ids?: number[];
    ids?: number[];
    is_open_for_members?: boolean;
    is_public?: boolean;
    limit?: number;
    page?: number;
    query?: string;
    show_inactive_groups?: boolean;
    show_overdue_groups?: boolean;
    show_overdue_groups_respect_settings?: boolean;
    target_group_ids?: number[];
    weekdays?: number[];
    without_my_groups?: boolean;
}

export interface PayloadMembersGet {
    limit?: number;
    page?: number;
    roles_ids?: number[];
}

export interface Calendar {
    campusId: number;
    color: string;
    eventTemplateId: number;
    iCalSourceUrl: string;
    id: number;
    isPrivate: boolean;
    isPublic: boolean;
    meta: {
        modifiedDate: ZuluDate;
        modifiedPid: number;
    };
    name: string;
    nameTranslated: string;
    randomUrl: string;
    sortKey: number;
}

export interface Appointment {
    base: {
        additions: AppointmentAdditions[];
        address: Address;
        allDay: boolean;
        calendar: Calendar;
        caption: string;
        endDate: ZuluDate;
        exceptions: AppointmentAdditions[];
        id: number;
        image?: ImageDomainObjectType;
        information: string;
        isInternal: boolean;
        link: string;
        meta: MetaType;
        note: string;
        onBehalfOfPid: number;
        repeatFrequency: number;
        repeatId: number;
        repeatOption: null;
        repeatUntil: DateString;
        startDate: ZuluDate;
        version: number;
        signup?: {
            signupGroupTypeId: number;
            signupTemplateGroupId: number;
            signupDaysArchiveGroupNo: number;
            singupDaysForwardNo: number;
            signupSetCompletionDate: boolean;
        };
    };
    calculated: {
        startDate: ZuluDate;
        endDate: ZuluDate;
    };
}
export interface AppointmentAdditions {
    id: number;
    date: ZuluDate;
    meta: {
        modifiedDate: ZuluDate;
        modifiedPid: 1;
    };
}

export interface Address {
    addition: string;
    city: string;
    country: string;
    district: string;
    latitude: string;
    longitude: string;
    meetingAt: string;
    street: string;
    zip: string;
}

export interface CTConfig {
    _current_config_file: string;
    accept_datasecurity: boolean;
    access_control_allow_origins: string[];
    admin_ids: string[];
    admin_mail: string;
    admin_message: string;
    allowcheckin: string;
    allowconsolidation: string;
    allowedcals: string;
    allowedclients: string;
    allowedresources: string;
    allowedservices: string;
    allowedstations: string;
    allowedsyncconnections: string;
    allowedsyncjobs: string;
    alloweduser: string;
    allowfinance: string;
    allowldap: string;
    allowoptigemsync: string;
    allowsync: string;
    app_security_request: boolean;
    authorized_persons: string;
    build: string;
    chrome_active: string;
    churchcal_active: boolean;
    churchcal_entries_last_days: number;
    churchcal_firstdayinweek: number;
    churchcal_maincalname: string;
    churchcal_name: string;
    churchcal_name_default: string;
    churchcal_sortcode: number;
    churchchat_allow_event_chat: boolean;
    churchchat_allow_group_chat: boolean;
    churchchat_allow_person_chat: boolean;
    churchchat_delete_event_chat_after_x_days: number;
    churchchat_invite_ct_event_chat: boolean;
    churchchat_invite_ct_group_chat: boolean;
    churchchat_name: string;
    churchchat_name_default: string;
    churchchat_sortcode: number;
    churchchat_sync_user_id: number;
    churchcheckin_active: boolean;
    churchcheckin_label_child: string;
    churchcheckin_label_parent: string;
    churchcheckin_label_standard: string;
    churchcheckin_name: string;
    churchcheckin_name_default: string;
    churchcheckin_sortcode: number;
    churchdb_active: boolean;
    churchdb_archivedeletehistory: boolean;
    churchdb_birthdaylist_station: string;
    churchdb_birthdaylist_status: string;
    churchdb_captcha_sitekey: string;
    churchdb_emailseparator: string;
    churchdb_groupnotchoosable: number;
    churchdb_home_lat: string;
    churchdb_home_lng: string;
    churchdb_mailchimp_apikey: string;
    churchdb_maxexporter: number;
    churchdb_memberlist_station: string;
    churchdb_memberlist_status: string;
    churchdb_name: string;
    churchdb_name_default: string;
    churchdb_sendgroupmails: boolean;
    churchdb_smspromote_apikey: string;
    churchdb_sortcode: number;
    churchfinance_active: boolean;
    churchfinance_name: string;
    churchfinance_name_default: string;
    churchfinance_sortcode: number;
    churchreport_active: boolean;
    churchreport_name: string;
    churchreport_name_default: string;
    churchreport_sortcode: number;
    churchresource_active: boolean;
    churchresource_anonymize_for_public_user: boolean;
    churchresource_entries_last_days: number;
    churchresource_name: string;
    churchresource_name_default: string;
    churchresource_send_emails: boolean;
    churchresource_sortcode: number;
    churchservice_active: boolean;
    churchservice_agendashowenumeration: boolean;
    churchservice_ccli_token: string;
    churchservice_ccli_token_secret: string;
    churchservice_entries_last_days: number;
    churchservice_invite_persons: boolean;
    churchservice_name: string;
    churchservice_name_default: string;
    churchservice_openservice_rememberdays: number;
    churchservice_reminderhours: number;
    churchservice_songwithcategoryasdir: boolean;
    churchservice_sortcode: number;
    churchsync_active: boolean;
    churchsync_inmenu: boolean;
    churchsync_name: string;
    churchsync_name_default: string;
    churchsync_sortcode: string;
    churchwiki_active: boolean;
    churchwiki_name: string;
    churchwiki_name_default: string;
    churchwiki_sortcode: number;
    cron_daily: ZuluDate;
    cron_hour_8: ZuluDate;
    cronjob_dbdump: boolean;
    cronjob_delay: number;
    csrf_enabled: boolean;
    currently_mail_sending: string;
    datasecurity_banner_enabled: boolean;
    db_name: string;
    db_password: string;
    db_server: string;
    db_user: string;
    default_phone_area_code: string;
    emailMethod: string;
    emailServer: string;
    enable_app: string;
    encryptionkey: string;
    feature_charset: string;
    feature_chat: boolean;
    finance_active: boolean;
    finance_inmenu: string;
    finance_name: string;
    finance_name_default: string;
    finance_sortcode: string;
    first_transaction: ZuluDate;
    googlemapskey: string;
    hostingservice: string;
    https_only: string;
    invite_email_text: string;
    is_churchtools_blog_widget_active: boolean;
    is_rss_widget_active: boolean;
    is_churchtools_onboarding_widget_active: boolean;
    is_pr_widget_active: boolean;
    language: string;
    last_cron: string;
    last_cron_finished: string;
    last_db_dump: string;
    last_import_clear: string;
    last_translation_update: string;
    ldap_otp_enabled: boolean;
    login_message: string;
    mail_enabled: boolean;
    mail_sending_in_background: string;
    mail_sending_starttime: string;
    mail_smtp_args_host: string;
    mail_smtp_args_password: string;
    mail_smtp_args_port: string;
    mail_smtp_args_smtpsecure: string;
    mail_smtp_args_username: string;
    mail_with_user_from_address: string;
    max_uploadfile_size_kb: number;
    memberlist_birthday_full: string;
    memberlist_email: string;
    memberlist_fax: string;
    memberlist_group_couples: string;
    memberlist_picture: string;
    memberlist_salutation: string;
    memberlist_telefongeschaeftlich: string;
    memberlist_telefonhandy: string;
    memberlist_telefonprivat: string;
    minimum_password_length: string;
    onboarding_start: ZuluDate;
    openstreetmaps_enabled: boolean;
    orderstatus: string;
    orderstatus_since_date: ZuluDate;
    package: string;
    prefix: string;
    prevent_export: boolean;
    privacy_policy_external: boolean;
    privacy_policy_external_link: string;
    privacy_policy_fields_mandatory: boolean;
    privacy_policy_internal: boolean;
    privacy_policy_relationships: string;
    profile: string;
    rabbitmq_config_host: string;
    rabbitmq_config_password: string;
    rabbitmq_config_port: string;
    rabbitmq_config_user: string;
    ratelimit_backend: string;
    rss_widget_link: string;
    send_data_security_mails: boolean;
    session_handler: string;
    session_sentinels: string[];
    short_name: string;
    show_remember_me: boolean;
    site_language: string;
    site_licensekey: string;
    site_logo: string;
    site_mail: string;
    site_name: string;
    site_offline: boolean;
    site_startpage: string;
    site_url: string;
    test: string;
    timezone: string;
    version: string;
    welcome: string;
    welcome_subtext: string;
}
export interface CTEvent {
    calendar: CalendarDomainObjectType;
    description: string;
    endDate: ZuluDate;
    guid: string;
    id: number;
    name: string;
    startDate: ZuluDate;
}

const fieldTypeCode = [
    'select',
    'text',
    'date',
    'textarea',
    'checkbox',
    'number',
    'multiselect',
    'radioselect',
] as const;
export type FieldTypeCode = (typeof fieldTypeCode)[number];
export const isFieldTypeCode = (x: FieldTypeCode): x is FieldTypeCode =>
    fieldTypeCode.includes(x);

const fieldCategoryCode = [
    'f_group',
    'f_address',
    'f_church',
    'f_category',
    'f_dep',
    'f_growpath',
    'f_datasecurity',
] as const;
export type FieldCategoryCode = (typeof fieldCategoryCode)[number];
export const isFieldCategoryCode = (
    x: FieldCategoryCode
): x is FieldCategoryCode => fieldCategoryCode.includes(x);

export interface BasicField {
    id: number;
    sortKey?: number;
    fieldTypeId: number;
    fieldTypeCode: FieldTypeCode;
    options?: { id: string; name: string }[];
}
export interface Field extends BasicField {
    column: string;
    deleteOnArchive?: boolean;
    fieldCategoryCode: FieldCategoryCode;
    hideInFrontend?: boolean;
    isActive?: '1' | '0';
    isBasicInfo?: '1' | '0';
    isNewPersonField?: boolean;
    key?: string;
    length: number;
    lineEnding?: string;
    name?: string;
    nameTranslated?: string;
    nullable?: boolean;
    secLevel: number;
    shorty?: string;
}
export interface Memberfield {
    type: string;
    field: BasicField & {
        groupId: number;
        fieldName: string;
        securityLevel: number;
        defaultValue: string;
        useInRegistrationForm: boolean;
        requiredInRegistrationForm: boolean;
    };
}

export interface PermissionResult {
    auth: unknown;
    auth_table: unknown;
    churchauth: {
        admins: string[];
        category: unknown;
        cc_securitylevel: unknown;
        cc_wikicategory: unknown;
        cdb_bereich: unknown;
        cdb_comment_viewer: unknown[];
        cdb_gruppe: unknown;
        cdb_gruppentyp: unknown;
        cdb_station: unknown[];
        cf_accounting_periods: unknown;
        cf_client: unknown;
        cr_resource: unknown;
        cr_resourcetype: unknown;
        cs_fact: unknown;
        cs_servicegroup: unknown;
        cs_songcategory: unknown[];
        group: unknown;
        groupMemberstatus: unknown;
        grouptype: unknown;
        grouptypeMemberstatus: {
            [id: number]: {
                auth: AuthObject;
                bezeichnung: string;
                default_yn: string;
                deleted_yn: string;
                growpath_id: string;
                gruppentyp_id: string;
                hidden_yn: string;
                id: string;
                kuerzel: string;
                leader_yn: string;
                request_yn: string;
                sortkey: string;
            };
        };
        hideUserRights: boolean;
        modulename: 'churchcore';
        modules: [
            'churchcore',
            'churchdb',
            'churchcal',
            'churchresource',
            'churchservice',
            'churchcheckin'
        ];
        names: unknown;
        person: {
            [id: number]: { auth: AuthObject; bezeichnung: string; id: string };
        };
        publiccalendar_name: 'Gemeindekalender';
        status: {
            [id: number]: {
                auth: AuthObject;
                bezeichnung: string;
                id: string;
                infreitextauswahl_yn: string;
                kuerzel: string;
                mitglied_yn: string;
                securitylevel_id: string;
                sortkey: string;
            };
        };
        system_user: unknown;
        templates: unknown;
    };
    views: unknown;
}

export interface AuthObject {
    [key: number]: string | AuthObject;
}

export interface WikiCategory {
    campusId?: number;
    fileAccessWithoutPermission?: boolean;
    id: number;
    inMenu?: boolean;
    name: string;
    nameTranslated?: string;
    sortKey: number;
}
export interface WikiPage {
    identifier: string;
    isMarkdown: boolean;
    meta?: MetaType;
    onStartpage: boolean;
    permissions?: {
        canEdit: boolean;
    };
    redirectTo?: string;
    text: string;
    title: string;
    version?: number;
    wikiCategory: WikiCategory;
}

export interface CTFile {
    domainId: string;
    domainType: string;
    fileUrl: string;
    filename: string;
    id: number;
    imageUrl: string;
    meta: MetaType;
    name: string;
    relativeUrl: string;
    securityLevelId: string;
    showOnlyWhenEditable: boolean;
    size: string;
    type: 'file';
}

export interface CampusGroup {
    group: GroupDomainObjectType;
    groupHomepageApi: string;
    groupHomepageUrl: string;
}
export interface CampusTag {
    name: string;
    nameTranslated: string;
    key: string;
}
export interface CampusService {
    day: number;
    note: string;
    repetition: string;
    time: string;
}
export interface Association {
    abbreviation: string;
    country: string;
    id: number;
    key: string;
    name: string;
}
export interface Denomination {
    name: string;
    nameTranslated: string;
    key: string;
}
export interface TeamPerson {
    person: PersonDomainObjectType;
    note: string;
    sortKey: number;
}
export interface Campus extends BaseMasterdata {
    address?: Address;
    association: Association;
    banner?: ImageDomainObjectType;
    denomination: Denomination;
    description: string;
    email: string;
    finderUrl: string;
    gallery: ImageDomainObjectType[];
    groups: CampusGroup[];
    guid: string;
    isPublished: boolean;
    logo?: ImageDomainObjectType;
    meta: MetaType;
    phone: string;
    profileType: 'church' | 'campus';
    serviceBanner: string;
    services: CampusService[];
    shortName: string;
    shorty: string;
    signUpGroup: GroupDomainObjectType;
    slug: string;
    socialMedia: {
        socialNetworkName: string;
    };
    tags: CampusTag[];
    team: TeamPerson[];
    teamTitle: string;
    visitors: number;
    website: string;
}

export interface GroupHomepage {
    defaultView: 'tile' | 'minitile' | 'list';
    filter: GroupHomepageFilter<
        Weekday | AgeGroup | TargetGroup | GroupCategory | Campus
    >[];
    groups: Omit<PublicGroup, 'signUpPersons'>[];
    id: number;
    isEnabled: boolean;
    meta: MetaType;
    orderDirection: 'ASC' | 'DESC';
    parentGroup: number;
    randomUrl: string;
    showFilter: boolean;
    showGroupImages: boolean;
    showLeader: boolean;
    showMap: boolean;
    sortBy: 'name' | 'dateOfFoundation';
}

interface GroupHomepageFilter<T> {
    id: number;
    type: string;
    label: string;
    labelTranslated: string;
    show: boolean;
    options: T[];
    sortKey: number;
}

export interface GroupPlace extends CreatedType {
    id: number;
    name?: string;
    district?: string;
    postalcode?: string;
    city?: string;
    markerUrl?: string;
    geoLat?: string;
    geoLng?: string;
    street?: string;
}

export interface PublicGroup {
    allowWaitinglist: boolean;
    autoAccept: boolean;
    canSignUp: boolean;
    children: number[];
    currentMemberCount: number;
    id: number;
    information: {
        ageGroups: AgeGroup[];
        campus: Campus;
        groupCategory: GroupCategory;
        groupPlaces: GroupPlace[];
        imageUrl: string;
        leader?: PersonDomainObjectType[];
        meetingTime: string;
        note: string;
        targetGroup: TargetGroup;
        weekday: Weekday;
    };
    maxMemberCount: number;
    name: string;
    requestedPlacesCount: number;
    requestedWaitinglistPlacesCount: number;
    settings: {
        allowOtherRegistration: boolean;
        allowSameemailRegistration: boolean;
        allowChildRegistration: boolean;
        allowSpouseRegistration: boolean;
        hideContactLeader: boolean;
        hideLogin: boolean;
        signUpNotificationSent?: boolean;
    };
    signUpConditions: {
        canContactLeader: boolean;
        endDateNotPassed: boolean;
        groupHasLeader: boolean;
        groupIsActive: boolean;
        groupIsNotFull: boolean;
        groupIsNotHidden: boolean;
        groupIsOpenForMembers: boolean;
        groupIsPublic: boolean;
        newPersonDepartmentIsSet: boolean;
        newPersonStationIsSet: boolean;
        newPersonStatusIsSet: boolean;
        rolesSetInGroup: boolean;
    };
    signUpHeadline: string;
    signUpPersons: {
        person: PersonDomainObjectType;
        status: 'NOT_CLICKED' | 'IN_GROUP' | 'REQUESTED';
    }[];
}

export interface Device {
    id: string;
    type: string;
    ttl: UTCDate;
    version: string;
    createdAt: UTCDate;
    updatedAt: UTCDate;
    meta: MetaType;
}

export interface GroupMeeting {
    id: number;
    dateFrom: ZuluDate;
    dateTo: ZuluDate;
    isCompleted: boolean;
}

export interface GroupAbsence {
    absenceReason: AbsenceReason;
    comment?: string;
    endDate: DateString;
    endTime?: ZuluDate;
    id: number;
    person: PersonDomainObjectType;
    startDate: DateString;
    startTime?: ZuluDate;
}

export interface GroupStatistics {
    unfiltered: {
        allPlaces: number;
        freePlaces: number;
        requestedPlaces: number;
        takenPlaces: number;
        waitinglistPlaces: number;
    };
    members: Record<string, { count: number; key: string }>;
}

export interface GroupEmail {
    id: number;
    roleId: number;
    isForWaitinglist: boolean;
    isActive: boolean;
    sender: null | PersonDomainObjectType;
    subject: string;
    body: string;
}

export interface PaginationMetaData {
    count: number;
    all: number;
    pagination: {
        current: number;
        lastPage: number;
        limit: number;
        total: number;
    };
}

export interface GroupHierarchy {
    groupId: number;
    group: GroupDomainObjectType;
    parents: number[];
    children: number[];
}

export interface Custommodule {
    id: number;
    shorty: string;
    name: string;
    description: string;
    sortKey: number;
}
export interface CustomdataCategory {
    id: number;
    shorty: string;
    name: string;
    description: string;
    customModuleId: number;
    securityLevelId: number;
    schema: string;
}
export interface CustomdataValue {
    id: number;
    dataCategoryId: number;
    value: string;
}
