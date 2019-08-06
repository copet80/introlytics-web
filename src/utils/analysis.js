const INTRODUCTION_REGEX = /introduction/i;

export function analyse(data, email) {
  const relationships = {};
  const lastSentAts = {};
  const intervals = {};
  const conversations = {};
  const conversationsBySubject = {};
  const ttrs = {};
  const sentTtrs = {};
  const receivedTtrs = {};
  const emailLC = email.toLowerCase();

  data
    .filter((entry) => {
      return (
        entry.from.toLowerCase() === emailLC ||
        entry.to.toLowerCase() === emailLC
      );
    })
    .sort((a, b) => {
      if (a.sentAt.isBefore(b.sentAt)) {
        return -1;
      } else if (a.sentAt.isBefore(b.sentAt)) {
        return 1;
      } else {
        return 0;
      }
    })
    .forEach((entry) => {
      const node1Email = entry.from <= entry.to ? entry.from : entry.to;
      const node2Email = entry.from > entry.to ? entry.from : entry.to;
      const node1Key = node1Email.toLowerCase();
      const node2Key = node2Email.toLowerCase();

      if (node1Key !== node2Key) {
        const key = `${node1Key}-${node2Key}`;
        const subject = entry.subject
          .replace(/re: /i, '')
          .replace(/fwd: /i, '');

        const lastSentAt = lastSentAts[key];
        let minInterval = Number.MAX_SAFE_INTEGER;
        let maxInterval = 0;

        if (lastSentAt) {
          minInterval = entry.sentAt.diff(lastSentAt, 'seconds');
          maxInterval = minInterval;
        }

        if (!intervals[key]) {
          intervals[key] = [];
        }
        intervals[key].push(maxInterval);

        if (!sentTtrs[key]) {
          sentTtrs[key] = [];
        }

        if (!receivedTtrs[key]) {
          receivedTtrs[key] = [];
        }

        if (!ttrs[key]) {
          ttrs[key] = [];
        }

        if (!conversations[key]) {
          conversations[key] = {};
        }
        if (!conversations[key][entry.conversationId]) {
          conversations[key][entry.conversationId] = [];
        }
        conversations[key][entry.conversationId].push(entry);

        if (!conversationsBySubject[key]) {
          conversationsBySubject[key] = {};
        }
        if (!conversationsBySubject[key][subject]) {
          conversationsBySubject[key][subject] = [];
        }
        conversationsBySubject[key][subject].push(entry);

        if (!relationships[key]) {
          relationships[key] = {
            node1: {
              introduction: {
                sentCount: 0,
                receivedCount: 0,
                interactionCount: 0,
                rating: 0,
              },
              key: node1Key,
              email: node1Email,
              sentCount: 0,
              receivedCount: 0,
              interactionCount: 0,
              minInterval: Number.MAX_SAFE_INTEGER,
              maxInterval: 0,
              avgInterval: 0,
              sentMinTTR: 0,
              sentMaxTTR: 0,
              sentAvgTTR: 0,
              receivedMinTTR: 0,
              receivedMaxTTR: 0,
              receivedAvgTTR: 0,
              minTTR: 0,
              maxTTR: 0,
              avgTTR: 0,
              sentResponses: {},
              receivedResponses: {},
              conversationCount: 0,
              sentResponseCount: 0,
              sentResponseRate: 0,
              receivedResponseCount: 0,
              receivedResponseRate: 0,
              messages: [],
              rating: 0,
            },
            node2: {
              introduction: {
                sentCount: 0,
                receivedCount: 0,
                interactionCount: 0,
                rating: 0,
              },
              key: node2Key,
              email: node2Email,
              sentCount: 0,
              receivedCount: 0,
              interactionCount: 0,
              minInterval: Number.MAX_SAFE_INTEGER,
              maxInterval: 0,
              avgInterval: 0,
              sentMinTTR: 0,
              sentMaxTTR: 0,
              sentAvgTTR: 0,
              receivedMinTTR: 0,
              receivedMaxTTR: 0,
              receivedAvgTTR: 0,
              minTTR: 0,
              maxTTR: 0,
              avgTTR: 0,
              sentResponses: {},
              receivedResponses: {},
              conversationCount: 0,
              sentResponseCount: 0,
              sentResponseRate: 0,
              receivedResponseCount: 0,
              receivedResponseRate: 0,
              messages: [],
              rating: 0,
            },
            introduction: {
              sentCount: 0,
              receivedCount: 0,
              interactionCount: 0,
              rating: 0,
            },
            interactionCount: 0,
            minInterval: Number.MAX_SAFE_INTEGER,
            maxInterval: 0,
            avgInterval: 0,
            sentMinTTR: 0,
            sentMaxTTR: 0,
            sentAvgTTR: 0,
            receivedMinTTR: 0,
            receivedMaxTTR: 0,
            receivedAvgTTR: 0,
            minTTR: 0,
            maxTTR: 0,
            avgTTR: 0,
            sentResponses: {},
            receivedResponses: {},
            conversationCount: 0,
            sentResponseCount: 0,
            sentResponseRate: 0,
            receivedResponseCount: 0,
            receivedResponseRate: 0,
            messages: [],
            rating: 0,
          };
        }

        const relationship = relationships[key];
        relationship.interactionCount++;
        relationship.messages.push(entry);

        if (entry.from === node1Email) {
          relationship.node1.sentCount++;
          relationship.node1.interactionCount++;

          if (INTRODUCTION_REGEX.test(subject)) {
            relationship.node1.introduction.sentCount++;
            relationship.node1.introduction.interactionCount++;
          }
        }
        if (entry.to === node1Email) {
          relationship.node1.receivedCount++;
          relationship.node1.interactionCount++;

          if (INTRODUCTION_REGEX.test(subject)) {
            relationship.node1.introduction.receivedCount++;
            relationship.node1.introduction.interactionCount++;
          }
        }
        if (entry.from === node2Email) {
          relationship.node2.sentCount++;
          relationship.node2.interactionCount++;

          if (INTRODUCTION_REGEX.test(subject)) {
            relationship.node2.introduction.sentCount++;
            relationship.node2.introduction.interactionCount++;
          }
        }
        if (entry.to === node2Email) {
          relationship.node2.receivedCount++;
          relationship.node2.interactionCount++;

          if (INTRODUCTION_REGEX.test(subject)) {
            relationship.node2.introduction.receivedCount++;
            relationship.node2.introduction.interactionCount++;
          }
        }
        if (lastSentAt) {
          relationship.minInterval = Math.min(
            relationship.minInterval,
            minInterval,
          );
          relationship.maxInterval = Math.max(
            relationship.maxInterval,
            maxInterval,
          );
        } else {
          relationship.minInterval = null;
          relationship.maxInterval = null;
          relationship.avgInterval = null;
        }

        lastSentAts[key] = entry.sentAt;
      }
    });

  Object.keys(relationships).forEach((key) => {
    const relationship = relationships[key];

    Object.keys(conversationsBySubject[key]).forEach((subject) => {
      let currentFrom = null;
      let currentTo = null;
      let lastSentAt = null;
      const subjectConversations = conversationsBySubject[key][subject];
      subjectConversations.forEach((entry) => {
        const from = entry.from.toLowerCase();
        const to = entry.to.toLowerCase();
        const sentAt = entry.sentAt;
        if (currentFrom === to && currentTo === from) {
          const ttr = entry.sentAt.diff(lastSentAt, 'seconds');
          ttrs[key].push(ttr);

          if (to === emailLC) {
            relationship.receivedResponses[subject] = true;
            receivedTtrs[key].push(ttr);
          }
          if (from === emailLC) {
            relationship.sentResponses[subject] = true;
            sentTtrs[key].push(ttr);
          }
        }
        currentFrom = from;
        currentTo = to;
        lastSentAt = sentAt;
      });
    });

    const intervalList = intervals[key] || [];
    const sentTtrList = sentTtrs[key] || [];
    const receivedTtrList = receivedTtrs[key] || [];
    const ttrList = ttrs[key] || [];

    relationship.sentResponseCount = Object.keys(
      relationship.sentResponses,
    ).length;
    relationship.receivedResponseCount = Object.keys(
      relationship.receivedResponses,
    ).length;
    relationship.conversationCount = Object.keys(
      conversationsBySubject[key] || [],
    ).length;
    relationship.sentResponseRate =
      relationship.conversationCount > 0
        ? relationship.sentResponseCount / relationship.conversationCount
        : null;
    relationship.receivedResponseRate =
      relationship.conversationCount > 0
        ? relationship.receivedResponseCount / relationship.conversationCount
        : null;

    relationship.avgInterval =
      intervalList.length === 0
        ? null
        : Math.floor(
            intervalList.reduce((sum, interval) => sum + interval, 0) /
              (intervals[key] || [0]).length,
          );

    relationship.sentMinTTR =
      sentTtrList.length === 0
        ? null
        : Math.floor(
            sentTtrList.reduce((sum, ttr) => Math.min(sum + ttr), 0) /
              (sentTtrs[key] || [0]).length,
          );

    relationship.sentMaxTTR =
      sentTtrList.length === 0
        ? null
        : Math.floor(
            sentTtrList.reduce((sum, ttr) => Math.max(sum + ttr), 0) /
              (sentTtrs[key] || [0]).length,
          );

    relationship.sentAvgTTR =
      sentTtrList.length === 0
        ? null
        : Math.floor(
            sentTtrList.reduce((sum, ttr) => sum + ttr, 0) /
              (sentTtrs[key] || [0]).length,
          );

    relationship.receivedMinTTR =
      receivedTtrList.length === 0
        ? null
        : Math.floor(
            receivedTtrList.reduce((sum, ttr) => Math.min(sum + ttr), 0) /
              (receivedTtrs[key] || [0]).length,
          );

    relationship.receivedMaxTTR =
      receivedTtrList.length === 0
        ? null
        : Math.floor(
            receivedTtrList.reduce((sum, ttr) => Math.max(sum + ttr), 0) /
              (receivedTtrs[key] || [0]).length,
          );

    relationship.receivedAvgTTR =
      receivedTtrList.length === 0
        ? null
        : Math.floor(
            receivedTtrList.reduce((sum, ttr) => sum + ttr, 0) /
              (receivedTtrs[key] || [0]).length,
          );

    relationship.minTTR =
      ttrList.length === 0
        ? null
        : Math.floor(
            ttrList.reduce((sum, ttr) => Math.min(sum + ttr), 0) /
              (ttrs[key] || [0]).length,
          );

    relationship.maxTTR =
      ttrList.length === 0
        ? null
        : Math.floor(
            ttrList.reduce((sum, ttr) => Math.max(sum + ttr), 0) /
              (ttrs[key] || [0]).length,
          );

    relationship.avgTTR =
      ttrList.length === 0
        ? null
        : Math.floor(
            ttrList.reduce((sum, ttr) => sum + ttr, 0) /
              (ttrs[key] || [0]).length,
          );

    relationship.node1.messages = relationship.messages;
    relationship.node2.messages = relationship.messages;

    relationship.node1.conversationCount = relationship.conversationCount;
    relationship.node1.sentResponseCount = relationship.sentResponseCount;
    relationship.node1.sentResponseRate = relationship.sentResponseRate;
    relationship.node1.receivedResponseCount =
      relationship.receivedResponseCount;
    relationship.node1.receivedResponseRate = relationship.receivedResponseRate;
    relationship.node2.conversationCount = relationship.conversationCount;
    relationship.node2.sentResponseCount = relationship.sentResponseCount;
    relationship.node2.sentResponseRate = relationship.sentResponseRate;
    relationship.node2.receivedResponseCount =
      relationship.receivedResponseCount;
    relationship.node2.receivedResponseRate = relationship.receivedResponseRate;

    relationship.node1.minInterval = relationship.minInterval;
    relationship.node1.maxInterval = relationship.maxInterval;
    relationship.node1.avgInterval = relationship.avgInterval;
    relationship.node2.minInterval = relationship.minInterval;
    relationship.node2.maxInterval = relationship.maxInterval;
    relationship.node2.avgInterval = relationship.avgInterval;

    relationship.node1.sentMinTTR = relationship.sentMinTTR;
    relationship.node1.sentMaxTTR = relationship.sentMaxTTR;
    relationship.node1.sentAvgTTR = relationship.sentAvgTTR;
    relationship.node1.receivedMinTTR = relationship.receivedMinTTR;
    relationship.node1.receivedMaxTTR = relationship.receivedMaxTTR;
    relationship.node1.receivedAvgTTR = relationship.receivedAvgTTR;
    relationship.node1.minTTR = relationship.minTTR;
    relationship.node1.maxTTR = relationship.maxTTR;
    relationship.node1.avgTTR = relationship.avgTTR;

    relationship.node2.sentMinTTR = relationship.sentMinTTR;
    relationship.node2.sentMaxTTR = relationship.sentMaxTTR;
    relationship.node2.sentAvgTTR = relationship.sentAvgTTR;
    relationship.node2.receivedMinTTR = relationship.receivedMinTTR;
    relationship.node2.receivedMaxTTR = relationship.receivedMaxTTR;
    relationship.node2.receivedAvgTTR = relationship.receivedAvgTTR;
    relationship.node2.minTTR = relationship.minTTR;
    relationship.node2.maxTTR = relationship.maxTTR;
    relationship.node2.avgTTR = relationship.avgTTR;

    // ratings calculation

    relationship.node1.rating = relationship.rating;
    relationship.node2.rating = relationship.rating;
  });

  return {
    relationships,
  };
}
