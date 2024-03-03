const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const declaration_2020 = [
  "https://public.nazk.gov.ua/documents/00228326-9b17-43c5-ad36-76152a81d891",
  "https://public.nazk.gov.ua/documents/34118fcb-01f5-4cbe-960d-f10f8c9f22c3",
  "https://public.nazk.gov.ua/documents/1a9f9c14-3521-480b-9fe6-31a9baa6574e",
  "https://public.nazk.gov.ua/documents/e82e4e71-995a-425b-8e16-167ae3112479",
  "https://public.nazk.gov.ua/documents/719fae8d-bf0e-45c3-baff-f3387870e8c9",
  "https://public.nazk.gov.ua/documents/06e0de1b-1108-4a0c-8733-d4fddd05fa5a",
  "https://public.nazk.gov.ua/documents/f5350574-646f-4dec-a4de-0fbfcf980a98",
  "https://public.nazk.gov.ua/documents/36b26db9-e7da-4fdc-875c-cb60e3163929",
  "https://public.nazk.gov.ua/documents/fc83ab8e-db08-4040-bde4-c92368687f11",
  "https://public.nazk.gov.ua/documents/3da98212-03f6-4ce5-ae62-239b942b5b49",
  "https://public.nazk.gov.ua/documents/b68deb13-8e30-49f8-b3fd-3af5c1014462",
  "https://public.nazk.gov.ua/documents/6c8264f2-6cff-4955-a8b9-f7797ca6ee3d",
  "https://public.nazk.gov.ua/documents/5f08793f-1bb3-4e87-8a86-addd05417b9c",
  "https://public.nazk.gov.ua/documents/dbb9430f-1d6a-43bc-9ba5-cfd6c8af077c",
  "https://public.nazk.gov.ua/documents/b6d277b5-469a-4b18-88d7-bbe7694a50b7",
  "https://public.nazk.gov.ua/documents/52de03c5-ddc4-4d75-b2f5-82fa144726ae",
  "https://public.nazk.gov.ua/documents/474e643c-b3ff-4047-96d4-3cd9c12e45ad",
  "https://public.nazk.gov.ua/documents/b1b8e6a3-7340-4bf3-845f-13b9384e166f",
  "https://public.nazk.gov.ua/documents/d20f86a2-73bf-46c0-aa83-1a25b2aad333",
  "https://public.nazk.gov.ua/documents/a564f075-fd0f-4cb6-9459-157599f92182",
  "https://public.nazk.gov.ua/documents/5be8b0d1-2896-49c8-be45-d06cfc3278b5",
  "https://public.nazk.gov.ua/documents/878b057f-4e33-458a-994b-d8ba6e05f0d3",
  "https://public.nazk.gov.ua/documents/a617ccfb-4f8f-4c2b-a60c-e1156c2bb8b6",
  "https://public.nazk.gov.ua/documents/ce9ce4c8-c1da-4990-9a4d-94c3a8eb1aa9",
  "https://public.nazk.gov.ua/documents/2e67c1aa-bbd7-44e7-a9d0-569df0d629b0",
  "https://public.nazk.gov.ua/documents/9a8dc2b2-bf5b-4733-84c3-04c11a61e460",
  "https://public.nazk.gov.ua/documents/b455267f-6a13-467d-87a0-adcc9c78ecc3",
  "https://public.nazk.gov.ua/documents/d07bc1b4-7e83-48f0-8571-de28c738efd3",
  "https://public.nazk.gov.ua/documents/6f58c272-a8d0-4ffd-a093-4b9b88729eb3",
  "https://public.nazk.gov.ua/documents/365eab2d-91f9-4354-a44d-cf593e606831",
  "https://public.nazk.gov.ua/documents/a14283a2-e99d-4800-a99f-e10205a7e4d0",
  "https://public.nazk.gov.ua/documents/48453e4b-5803-4fb5-87a1-4296126768ed",
  "https://public.nazk.gov.ua/documents/66faa306-0358-4988-8327-512b0b30bbab",
  "https://public.nazk.gov.ua/documents/1cb47319-24fe-4997-8658-60fe8e4d0114",
  "https://public.nazk.gov.ua/documents/3aef7604-29ac-4461-874b-1810ff8d353d",
  "https://public.nazk.gov.ua/documents/1d91fdb9-38c2-4013-84ea-31051ccbf3a7",
  "https://public.nazk.gov.ua/documents/32355306-1678-463d-b538-1e905e78f5c6",
  "https://public.nazk.gov.ua/documents/8565a80b-8df6-4f3a-af6e-217c90bc80f1",
  "https://public.nazk.gov.ua/documents/f37b64b4-837e-4c62-8e26-414ddb75b632",
  "https://public.nazk.gov.ua/documents/f67ef3b1-7486-471b-846a-75b121d054df",
  "https://public.nazk.gov.ua/documents/abb0a1b4-4d9c-4aab-a6a9-acc22065798c",
  "https://public.nazk.gov.ua/documents/25700e35-769e-4bf4-b164-5d88c3aaec0b",
  "https://public.nazk.gov.ua/documents/e196b143-1506-42ad-ada7-145acdc38bc6",
  "https://public.nazk.gov.ua/documents/5e8abba1-c2ac-4744-bcea-60988409aff8",
  "https://public.nazk.gov.ua/documents/115c6b83-5cbf-4344-8139-3e0d585151ae",
  "https://public.nazk.gov.ua/documents/6467b408-38bf-48cd-a628-557abbcc5375",
  "https://public.nazk.gov.ua/documents/20b25d08-7f24-43c2-b9ec-cc21e7b4db90",
  "https://public.nazk.gov.ua/documents/11d68656-f808-4c23-aa85-2a620810306f",
  "https://public.nazk.gov.ua/documents/a0e49caa-72fd-4c2b-9fa4-bb812f8abb05",
  "https://public.nazk.gov.ua/documents/6bb9f34a-8397-416f-83d3-be39d3c6dcae",
  "https://public.nazk.gov.ua/documents/3eb6f2dc-601e-4f56-af7f-40078980d4da",
  "https://public.nazk.gov.ua/documents/6a3bf70f-ad47-4e02-b01b-d7dd3b5d9925",
  "https://public.nazk.gov.ua/documents/6f9ef1a2-5c8d-4a36-b5f2-af80eea5c0df",
  "https://public.nazk.gov.ua/documents/5afd35e5-5158-424e-be46-7043b126cbe5",
  "https://public.nazk.gov.ua/documents/886e73c4-a908-4aee-9202-0a1e5fa63ca4",
  "https://public.nazk.gov.ua/documents/abd27993-e10d-4b80-aa51-8ba80dd7fd24",
  "https://public.nazk.gov.ua/documents/1faab4f1-43c1-4c6f-9f4b-1c0dbb05542f",
  "https://public.nazk.gov.ua/documents/4892c9f4-9ae7-441a-866f-9c3bcfd9344b",
  "https://public.nazk.gov.ua/documents/fd7138b6-d6e3-443f-83df-9ea5fb9a429e",
  "https://public.nazk.gov.ua/documents/442eb066-2d21-4fec-94d9-5dbf2a5e3ded",
  "https://public.nazk.gov.ua/documents/6d5fc2cf-bf08-42c9-8bb0-99f73326c534",
  "https://public.nazk.gov.ua/documents/73104db1-aec1-4ca5-84fa-ab95d3f9e687",
  "https://public.nazk.gov.ua/documents/423c28ee-15e0-459e-ad98-36db3f1bc618",
  "https://public.nazk.gov.ua/documents/cb452929-c270-4bba-a319-6e09df080bd4",
  "https://public.nazk.gov.ua/documents/956ad5b3-9eed-4f27-9cf4-e4017c2dee89",
  "https://public.nazk.gov.ua/documents/804e7b42-d352-4ed8-9f18-982c891d73a5",
  "https://public.nazk.gov.ua/documents/3f08a407-075d-4c05-83d3-2b8d2a4017f6",
  "https://public.nazk.gov.ua/documents/700e973d-0d61-41fc-b6fd-bcf02a9fc188",
  "https://public.nazk.gov.ua/documents/43ebf5e3-947e-4812-8352-3ed52b48eaf5",
  "https://public.nazk.gov.ua/documents/742aa14f-1c81-44fc-a46d-9f2c51258956",
  "https://public.nazk.gov.ua/documents/b6fcc03a-5eb9-4d19-b82e-6059be7f4577",
  "https://public.nazk.gov.ua/documents/e0229bc2-ae1d-4029-b434-903b9f5a8a96",
  "https://public.nazk.gov.ua/documents/80cfc4ab-a5ac-4e4b-aeda-37d8c7f67579",
  "https://public.nazk.gov.ua/documents/f530d7b3-278b-412d-8e84-37017bfde2ea",
  "https://public.nazk.gov.ua/documents/aebc77e3-3ec2-48b9-b22c-fcd133ed7409",
  "https://public.nazk.gov.ua/documents/142cebe2-e86a-4c0f-94c3-78c7aaf59ec8",
  "https://public.nazk.gov.ua/documents/95954fd4-3e9a-4b07-a636-dc3a8192e972",
  "https://public.nazk.gov.ua/documents/ff71b3a9-e302-4dda-8b2c-9ed32ee9ceed",
  "https://public.nazk.gov.ua/documents/5f11b338-e25b-46ec-b025-7781378497eb",
  "https://public.nazk.gov.ua/documents/8b08ad9b-ce05-4ef2-9df9-5592db284edd",
  "https://public.nazk.gov.ua/documents/5ed1d2c2-ff19-43da-816d-c87a5ba11e51",
  "https://public.nazk.gov.ua/documents/c42a4cee-8f40-458a-af26-3aed35eb0751",
  "https://public.nazk.gov.ua/documents/97f45a6b-72b0-44c2-adf3-c8e1a0a517e0",
  "https://public.nazk.gov.ua/documents/270f8fa1-4e47-4ec3-9128-6bf7e0a9d1ae",
  "https://public.nazk.gov.ua/documents/cfd1eb58-c70f-47b5-a66a-0ef36183cd47",
  "https://public.nazk.gov.ua/documents/8db14222-1cad-4d82-ae8c-88d4ab8e5d58",
  "https://public.nazk.gov.ua/documents/344396d0-f618-4e1e-8b6e-b10487260012",
  "https://public.nazk.gov.ua/documents/c40aedbd-cc34-47c8-91ce-3c5ab09b2739",
  "https://public.nazk.gov.ua/documents/8cf372bd-50cb-4de0-90a7-e2c152ab25e9",
  "https://public.nazk.gov.ua/documents/313e674f-b0dc-40bf-af31-fb82fe520f08",
  "https://public.nazk.gov.ua/documents/7be9a2cc-f7b2-4577-a793-44e9be560765",
  "https://public.nazk.gov.ua/documents/69401584-4d52-447c-952a-2989af049175",
  "https://public.nazk.gov.ua/documents/a92fb0e1-41c5-42c9-a716-b0e5adf0f67f",
  "https://public.nazk.gov.ua/documents/d27e3d97-daa6-4918-bf6e-c26dc4fd0fd0",
  "https://public.nazk.gov.ua/documents/5d9e1fd9-827d-4ba2-bf87-753dda5685cb",
  "https://public.nazk.gov.ua/documents/0f052a5c-c6e3-4311-8e3d-54e7eee24fa2",
  "https://public.nazk.gov.ua/documents/0603d66c-80de-4410-a97e-889185c7a1ec",
  "https://public.nazk.gov.ua/documents/f2bbe1bb-2a07-4fc2-b9f4-ef5cdc971348",
  "https://public.nazk.gov.ua/documents/5bf1db63-c2c4-4369-8ac4-87a3ec466c70",
  "https://public.nazk.gov.ua/documents/3a9cfbaf-b88f-4df9-b443-728ce993f676",
  "https://public.nazk.gov.ua/documents/629c55b4-e860-4aae-9f3d-d66c852f6b5d",
  "https://public.nazk.gov.ua/documents/c2e5f1b7-02b3-49db-905c-8e1805123035",
  "https://public.nazk.gov.ua/documents/f20fac0d-e176-4648-a222-f77035cf27dc",
  "https://public.nazk.gov.ua/documents/b8ea55b6-d811-451a-9b13-8ce687fecdb7",
  "https://public.nazk.gov.ua/documents/3b07dbe6-29ca-469d-9842-873d56fd5642",
  "https://public.nazk.gov.ua/documents/d94cf54e-0529-4c4e-902d-c37918ba5740",
  "https://public.nazk.gov.ua/documents/8c6be2fc-8911-4c00-b51d-140e3bbb17c2",
  "https://public.nazk.gov.ua/documents/05c56768-3b47-469d-be2a-b9cc8e9fdae7",
  "https://public.nazk.gov.ua/documents/19edcefd-bcff-4970-8a88-7fb19689a2be",
  "https://public.nazk.gov.ua/documents/7e3e1ab0-d143-480c-8ea7-93ae5e639bf6",
  "https://public.nazk.gov.ua/documents/22000d33-359e-4338-ad7b-bb338f37a05a",
  "https://public.nazk.gov.ua/documents/43302355-a83e-4a3c-8432-8c76e39c2cc2",
  "https://public.nazk.gov.ua/documents/8ed45561-fd84-46c9-ae23-2ab45268531c",
  "https://public.nazk.gov.ua/documents/afdede6b-7429-4eb6-8fdd-582614659014",
  "https://public.nazk.gov.ua/documents/90c32024-229f-42c8-b5f2-557359472c41",
];
const declaration_2022 = [
  "https://public.nazk.gov.ua/documents/581f3316-9625-4664-9b3d-338c116ff0e7",
  "https://public.nazk.gov.ua/documents/f04fc860-17e7-44c2-90e8-2add5f0096da",
  "https://public.nazk.gov.ua/documents/5901c276-3d6a-4c60-bbb0-1470d996c030",
  "https://public.nazk.gov.ua/documents/e93610ce-1151-4979-94ad-c5e4efaa485f",
  "https://public.nazk.gov.ua/documents/f28ee84d-e679-44d5-a248-c21710f46f7d",
  "https://public.nazk.gov.ua/documents/0f7856b4-b42f-4fbc-bb68-94ee97dc97f8",
  "https://public.nazk.gov.ua/documents/b39dd3f1-f477-4e97-bf79-197fe9c12cd3",
  "https://public.nazk.gov.ua/documents/7667f332-3d1d-4902-b2b8-0d115423033e",
  "https://public.nazk.gov.ua/documents/8764132c-a6d2-4f32-881e-e6fe38a6ed13",
  "https://public.nazk.gov.ua/documents/5185eed6-c6e6-424d-98e4-1c460f17d692",
  "https://public.nazk.gov.ua/documents/6a605905-e950-4cb0-bf6c-f3b038f8af23",
  "https://public.nazk.gov.ua/documents/d5061533-f6e3-4262-9350-46c23f1a017e",
  "https://public.nazk.gov.ua/documents/4b812556-0b6f-43bb-8d0e-6eb24ba3eef3",
  "https://public.nazk.gov.ua/documents/94a397a6-7c89-4983-82d3-a4687eab6d18",
  "https://public.nazk.gov.ua/documents/1e73ff6e-6db0-46e2-bfcf-1a0a3c3a7390",
  "https://public.nazk.gov.ua/documents/ca499ff5-7383-4824-9f38-eb46e4df7c30",
  "https://public.nazk.gov.ua/documents/6176e52e-c23b-45df-8da8-a840bc974cae",
  "https://public.nazk.gov.ua/documents/c805ce3f-f16c-4b24-a6d1-b70cd5e7fc1d",
  "https://public.nazk.gov.ua/documents/68946509-472b-420a-b241-a0162263860a",
  "https://public.nazk.gov.ua/documents/a9daa9da-4149-401c-badb-0742876f9ac7",
  "https://public.nazk.gov.ua/documents/9e0bcbdd-e9bc-49be-832d-94da06422a9a",
  "https://public.nazk.gov.ua/documents/77a18622-cf27-4a96-9886-83132b293033",
  "https://public.nazk.gov.ua/documents/92d08672-a3f9-4b83-b0dd-23737cf94196",
  "https://public.nazk.gov.ua/documents/54df8d96-2f56-44f6-bfdc-472701c2415c",
  "https://public.nazk.gov.ua/documents/3da554c6-65f1-4e75-9714-4a17f9f913c5",
  "https://public.nazk.gov.ua/documents/a8945065-b50f-4986-8c4d-c681b21ed881",
  "https://public.nazk.gov.ua/documents/dc9a2772-8634-4b45-b763-54c339913705",
  "https://public.nazk.gov.ua/documents/8c3bfa46-e67f-4337-851b-0df77cf3c046",
  "https://public.nazk.gov.ua/documents/50d3f940-8d0e-4754-8e86-cd6a4b6f259d",
  "https://public.nazk.gov.ua/documents/cfffc121-4022-472b-8e29-7c29af150d7c",
  "https://public.nazk.gov.ua/documents/bdadd8ec-e360-47e8-aa8b-f2a19a9677a7",
  "https://public.nazk.gov.ua/documents/efd6bcdc-ff1d-4361-8152-da3ca6f5a4dd",
  "https://public.nazk.gov.ua/documents/ad50f268-852c-4e7d-8ef7-94b6c0ebfa54",
  "https://public.nazk.gov.ua/documents/2ce79739-ceb0-4101-a52e-f161df0473b5",
  "https://public.nazk.gov.ua/documents/eb462b1f-ad50-445a-9d27-8dcd9cceae6e",
  "https://public.nazk.gov.ua/documents/20b8ba91-0279-41a7-80f6-61c2a9a5a5c6",
  "https://public.nazk.gov.ua/documents/2c4bea0b-6f13-4a8c-9e07-aa7b0d867c2c",
  "https://public.nazk.gov.ua/documents/26257d18-9bcb-4dc9-8467-86cb65d52000",
  "https://public.nazk.gov.ua/documents/167e1e32-6ab8-4642-bcea-1696f7c65e38",
  "https://public.nazk.gov.ua/documents/4bb11e62-babb-4e63-8794-5010de985c9b",
  "https://public.nazk.gov.ua/documents/df2e59fc-a766-4152-af31-f32d928444de",
  "https://public.nazk.gov.ua/documents/9ded9c9f-4601-4be7-9849-c541d6719f69",
  "https://public.nazk.gov.ua/documents/ae1c754f-1c97-4dff-91f6-9bceeff5b0cf",
  "https://public.nazk.gov.ua/documents/cbc812b6-0a2a-4622-919b-e5ee60c8f9d7",
  "https://public.nazk.gov.ua/documents/8bcd1448-3e42-4d68-87d3-2a17037f962f",
  "https://public.nazk.gov.ua/documents/b7136058-24ad-460e-9523-2edc4a8feb53",
  "https://public.nazk.gov.ua/documents/400d4521-cbcc-4c70-8b56-edcdebcba6f8",
  "https://public.nazk.gov.ua/documents/820cb796-418c-4481-8206-51567b45d157",
  "https://public.nazk.gov.ua/documents/fa203637-9c8d-411b-99e6-870ace3f6772",
  "https://public.nazk.gov.ua/documents/e489070e-6a4d-4934-9fa6-d0857156f8df",
  "https://public.nazk.gov.ua/documents/7b2c42f9-56f8-4aeb-aa49-65cb1c0003e0",
  "https://public.nazk.gov.ua/documents/12646b37-bd38-4dd1-a131-969667ff8abc",
  "https://public.nazk.gov.ua/documents/4e920561-323f-4b47-a501-e6735a21a2c2",
  "https://public.nazk.gov.ua/documents/9d3a4e9c-3082-4dfc-ba5f-b462060ef229",
  "https://public.nazk.gov.ua/documents/2cb7b33c-6847-4032-b072-e645198030ea",
  "https://public.nazk.gov.ua/documents/07fc4ce1-52c6-4bb3-a41c-9a52889ce52f",
  "https://public.nazk.gov.ua/documents/184d5a6b-69f9-4ef2-832e-bbaa178d8a59",
  "https://public.nazk.gov.ua/documents/6d107143-966e-461b-84ab-21149b0738ab",
  "https://public.nazk.gov.ua/documents/5e1cd5e1-e25f-4c82-a419-068c4dcc0969",
  "https://public.nazk.gov.ua/documents/23d93213-168f-4b8c-b6e3-8d92b8dc7887",
  "https://public.nazk.gov.ua/documents/42e38121-ea05-4540-97f2-072e1030c6e6",
  "https://public.nazk.gov.ua/documents/5bb362de-825f-41cd-bca2-4085d3af1a67",
  "https://public.nazk.gov.ua/documents/6f254456-8619-476e-9c98-9d9fcaba150a",
  "https://public.nazk.gov.ua/documents/077a683b-c289-41d0-ac29-0b1d04cde20e",
  "https://public.nazk.gov.ua/documents/77830b1b-d32a-4949-a3f4-d546de3089d7",
  "https://public.nazk.gov.ua/documents/d06878a8-a79a-44b8-895e-eab0efdffb70",
  "https://public.nazk.gov.ua/documents/2ef2d675-03f7-453a-b8bc-fa57bf3ed88d",
  "https://public.nazk.gov.ua/documents/5700aaf2-af15-479d-815d-343f1dfd9556",
  "https://public.nazk.gov.ua/documents/af1a9ebf-b915-469b-854a-6bfef41f249f",
  "https://public.nazk.gov.ua/documents/361d5636-e05c-4ee1-9826-7cb459587928",
  "https://public.nazk.gov.ua/documents/bf7cd675-4dde-4bc3-8c94-d59045638412",
  "https://public.nazk.gov.ua/documents/8092142d-cf7f-42ef-8396-3bad0a8e4d12",
  "https://public.nazk.gov.ua/documents/7015f0a2-f7bf-40e9-85a2-025081a40071",
  "https://public.nazk.gov.ua/documents/50e18c63-efd0-4639-9e9f-ace9aaa1708a",
  "https://public.nazk.gov.ua/documents/983163f4-8a77-4b06-842f-f6fe1766a899",
  "https://public.nazk.gov.ua/documents/daa97fac-7a1e-4a09-8f37-1c75a6cc5dbe",
  "https://public.nazk.gov.ua/documents/62af1304-2329-43c0-90d4-76d7ed9a4f46",
  "https://public.nazk.gov.ua/documents/92e25282-2c9c-4b47-8157-61f4b3746668",
  "https://public.nazk.gov.ua/documents/1ece5dd6-6105-4ddb-ba5e-40a811e7ed51",
  "https://public.nazk.gov.ua/documents/36a795c9-cf39-43f3-8cfc-88fffcb1bdcd",
  "https://public.nazk.gov.ua/documents/dd2b7a8f-f795-4bad-9295-9d0a75af8a63",
  "https://public.nazk.gov.ua/documents/ed599c4c-30c1-4c9d-8e13-505b643ca82d",
  "https://public.nazk.gov.ua/documents/fb232983-8c35-4366-83fe-c0875b3182a4",
  "https://public.nazk.gov.ua/documents/7dbf7d23-9736-4c86-b26e-68872a9ec61b",
  "https://public.nazk.gov.ua/documents/756af39c-09cf-4b88-a565-99303387a38b",
  "https://public.nazk.gov.ua/documents/f220715d-e18d-49d8-9de9-35e6f89952e2",
  "https://public.nazk.gov.ua/documents/a811395d-791f-4d85-a5bc-1685851e9215",
  "https://public.nazk.gov.ua/documents/fa8dbd37-3a98-47ed-af08-f63db065b676",
  "https://public.nazk.gov.ua/documents/1ea69c77-44de-4bb0-a6bc-ed71c903f922",
  "https://public.nazk.gov.ua/documents/bbddf4f6-9e5e-47ba-a5ef-c517a9567e72",
  "https://public.nazk.gov.ua/documents/a7d4ff97-8490-449b-8a05-f16aa1b8aae3",
  "https://public.nazk.gov.ua/documents/98bf99fe-5e48-4230-b42b-3e611f5259e8",
  "https://public.nazk.gov.ua/documents/6fd0215f-414b-4aef-a48a-b23cc0cf7aa5",
  "https://public.nazk.gov.ua/documents/4d176f7e-7ecd-4f67-a42d-932d7a5702c9",
  "https://public.nazk.gov.ua/documents/aeb36138-6e82-4477-98e9-66b7f9a9f211",
  "https://public.nazk.gov.ua/documents/f8c1cda0-3821-4854-879e-4a9f080a6a96",
  "https://public.nazk.gov.ua/documents/0670bc99-ea36-4dd8-9281-0655a47354ea",
  "https://public.nazk.gov.ua/documents/cd601af1-0708-40d1-8364-ecf8f29b4792",
  "https://public.nazk.gov.ua/documents/59cc0e24-1fa0-4186-a40f-fb9ceb4ef011",
  "https://public.nazk.gov.ua/documents/cbe308bb-0b91-471b-b42a-fb57a41f9c9f",
  "https://public.nazk.gov.ua/documents/42ce4197-e229-434f-8752-af7cf1bfd23b",
  "https://public.nazk.gov.ua/documents/cae268cc-d1d0-49b9-9c57-8f5cc36bd850",
  "https://public.nazk.gov.ua/documents/22121331-31cb-4a1a-b176-5090101b319f",
  "https://public.nazk.gov.ua/documents/df3fad94-5d3c-42a7-82fb-0e09b33897b2",
  "https://public.nazk.gov.ua/documents/a427d01b-8914-4336-b541-b8e4807871e0",
  "https://public.nazk.gov.ua/documents/61b21fca-492b-4c6a-8db9-a4d2f16a8c5b",
  "https://public.nazk.gov.ua/documents/72616622-b773-47db-b09d-1518d044768a",
];
const app = express();
const port = 3000;

function dataToCSV(data) {
  let csvContent = "";

  data.forEach((section, sectionIndex) => {
    section.forEach((item) => {
      csvContent += item.title + "\r\n";
      if (item.depute_name) {
        csvContent += item.depute_name + "\r\n";
      }
      if (item.data && item.data.length > 0) {
        const headers = item.data[0].join(";");
        csvContent += headers + "\r\n";

        for (let i = 1; i < item.data.length; i++) {
          csvContent += item.data[i].join(";") + "\r\n";
        }
        csvContent += "\r\n";
      }
    });
  });
  fs.writeFile("all_sections_2022.csv", csvContent, (err) => {
    if (err) {
      console.error("Failed to save CSV:", err);
    } else {
      console.log("All sections saved as a single CSV.");
    }
  });
}

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/fetch-declaration", async (req, res) => {
  const tablesData = [];
  for (const link of declaration_2022) {
    try {
      const dataFromHtml = [];
      const { data } = await axios.get(link);
      const $ = cheerio.load(data);
      const tables = $(".card"); 
      tables.each((_, element) => {
        const title = $(element)
          .find(".card-header .card-header-title")
          .text()
          .trim();

        const deputeInfoRows = $(element)
          .find(".card-body > fieldset > .info-block > .info-item")
          .slice(0, 3);
        let depute_name = "";
        deputeInfoRows.each((_, row) => {
          const info = $(row).find("span").eq(1).text().trim();
          depute_name += info + " ";
        });
        if (title === "2.1. Інформація про суб'єкта декларування") {
          depute_name = depute_name.trim();
        }

        const tableRows = $(element).find("table.table").find("tr");
        const tableData = [];

        tableRows.each((index, row) => {
          const rowCells = $(row).find("td, th"); // Support for both table header and data cells
          const rowData = [];
          rowCells.each((_, cell) => {
            rowData.push($(cell).text().trim());
          });
          tableData.push(rowData);
        });

        dataFromHtml.push({ title, depute_name, data: tableData });
      });
      tablesData.push(dataFromHtml);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching table data");
    }
  }
  const filteredData = tablesData.map((declaration) => {
    return declaration.filter(
      (item) =>
        item.title !== "" &&
        item.title !== "1. Вид декларації та звітний період" &&
        item.title !==
          "2.2. Інформація про членів сім'ї суб'єкта декларування" &&
        item.title !== "7. Цінні папери" &&
        item.title !== "8. Корпоративні права" &&
        item.title !==
          "9. Юридичні особи, трасти або інші подібні правові утворення, кінцевим бенефіціарним власником (контролером) яких є суб’єкт декларування або члени його сім'ї" &&
        item.title !==
          "12.1. Банківські та інші фінансові установи, у яких відкрито рахунки суб'єкта декларування або членів його сім'ї" &&
        item.title !== "13. Фінансові зобов'язання" &&
        item.title !== "14. Видатки та правочини суб'єкта декларування" &&
        item.title !== "Інші документи суб'єкта декларування"
    );
  });
  dataToCSV(filteredData);

  res.json({ filteredData });
});

app.listen(port, () => {
  console.log(`The server is running in port ${port}`);
});
