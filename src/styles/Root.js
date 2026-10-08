import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  // ==========================================================
  // MAIN
  // ==========================================================

  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    paddingHorizontal: 18,
    paddingBottom: 35,
  },



  // ==========================================================
  // BRAND / LOGO
  // ==========================================================

  brandSection: {
    alignItems: "center",
    marginTop: 80,
  },

  logoContainer: {
    width: 120,
    height: 112,
    position: "relative",
    alignItems: "center",
  },

  // ----------------------------------------------------------
  // Blue Person
  // ----------------------------------------------------------

  logoPersonBlue: {
    position: "absolute",

    left: 13,
    top: 5,

    width: 52,
    height: 52,

    borderRadius: 26,

    backgroundColor: "#2563EB",

    alignItems: "center",
    justifyContent: "center",

    zIndex: 2,
  },

  // ----------------------------------------------------------
  // Purple Person
  // ----------------------------------------------------------

  logoPersonPurple: {
    position: "absolute",

    right: 13,
    top: 5,

    width: 52,
    height: 52,

    borderRadius: 26,

    backgroundColor: "#7C3AED",

    alignItems: "center",
    justifyContent: "center",

    zIndex: 2,
  },

  // ----------------------------------------------------------
  // Search Circle
  // ----------------------------------------------------------

  logoSearchCircle: {
    position: "absolute",

    top: 35,

    width: 65,
    height: 65,

    borderRadius: 33,

    backgroundColor: "#FFFFFF",

    borderWidth: 6,
    borderColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",

    zIndex: 5,

    elevation: 7,

    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  // ----------------------------------------------------------
  // Small Briefcase inside Search
  // ----------------------------------------------------------

  logoBriefcase: {
    position: "absolute",

    right: 14,
    bottom: 13,

    width: 20,
    height: 18,

    borderRadius: 5,

    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",
  },

  // ----------------------------------------------------------
  // Logo Text
  // ----------------------------------------------------------

  logoText: {
    fontSize: 42,
    lineHeight: 48,

    fontWeight: "900",

    letterSpacing: -1.7,

    marginTop: 3,
  },

  logoBlue: {
    color: "#2563EB",
  },

  logoPurple: {
    color: "#7C3AED",
  },

  tagline: {
    marginTop: 2,

    fontSize: 16,

    color: "#475569",

    fontWeight: "500",

    textAlign: "center",
  },


  // ==========================================================
  // HERO
  // ==========================================================

  heroSection: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25,
  },

  heroTitle: {
    fontSize: 20,
    lineHeight: 36,
    fontWeight: "900",
    color: "#111B49",
    textAlign: "center",
  },

  heroDescription: {
    maxWidth: 300,
    marginTop: 12,
    fontSize: 16,
    lineHeight: 24,
    color: "#64748B",
    textAlign: "center",

    paddingHorizontal: 8,
  },


  // ==========================================================
  // ROLE CARD
  // ==========================================================

  roleCard: {
    width: "100%",
    borderRadius: 10,
    padding: 16,
    paddingTop:0,
    marginBottom: 10,
    borderWidth: 1,
    overflow: "hidden",
  },


  // ==========================================================
  // EMPLOYEE CARD
  // ==========================================================

  employeeCard: {
    backgroundColor: "#EFF6FF",
    borderColor: "#BFDBFE",
  },

  employeeIcon: {
    backgroundColor: "#2563EB",
  },


  // ==========================================================
  // EMPLOYER CARD
  // ==========================================================

  employerCard: {
    backgroundColor: "#F5F3FF",

    borderColor: "#DDD6FE",
  },

  employerIcon: {
    backgroundColor: "#7C3AED",
  },


  // ==========================================================
  // ADMIN CARD
  // ==========================================================

  adminCard: {
    backgroundColor: "#F8FAFC",

    borderColor: "#E2E8F0",
  },

  adminIcon: {
    backgroundColor: "#172554",
  },


  // ==========================================================
  // ROLE TOP ROW
  // ==========================================================

  roleTopRow: {
    width: "100%",

    flexDirection: "row",

    alignItems: "center",
  },


  // ==========================================================
  // ROLE ICON
  // ==========================================================

  roleIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    flexShrink: 0,
  },

  smallBriefcase: {
    position: "absolute",

    right: 7,
    bottom: 7,

    width: 22,
    height: 22,

    borderRadius: 11,

    alignItems: "center",
    justifyContent: "center",
  },


  // ==========================================================
  // ROLE CONTENT
  // ==========================================================

  roleContent: {
    flex: 1,
    paddingHorizontal: 16,
  },

  roleTitle: {
    fontSize: 24,
    lineHeight: 25,
    fontWeight: "800",
    color: "#111B49", 
    marginTop:16,
  },

  roleDescription: {
    fontSize: 14,
    lineHeight: 10,
    color: "#475569",
  },


  // ==========================================================
  // ARROW
  // ==========================================================

  arrowButton: {
    width: 36,
    height: 36,

    borderRadius: 24,

    alignItems: "center",
    justifyContent: "center",

    flexShrink: 0,
  },


  // ==========================================================
  // FEATURES
  // ==========================================================

  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 5,
  },

  feature: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },

  featureCheck: {
    width: 23,
    height: 23,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 3,
  },

  featureText: {
    fontSize: 11,

    color: "#475569",

    fontWeight: "500",

    flexShrink: 1,
  },


  // ==========================================================
  // FOOTER
  // ==========================================================

  footer: {
    alignItems: "center",
    paddingTop: 17,
    paddingBottom: 12,
    marginTop: 110,
  },

  footerHeadingRow: {
    width: "100%",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",
  },

  footerLine: {
    flex: 1,

    maxWidth: 70,

    height: 1,

    backgroundColor: "#94A3B8",

    marginHorizontal: 12,
  },

  footerTitle: {
    fontSize: 14,

    color: "#172554",

    fontWeight: "600",

    textAlign: "center",

    flexShrink: 1,
  },


  // ==========================================================
  // TRUST
  // ==========================================================

  trustRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    marginTop: 16,

    gap: 22,
  },

  trustItem: {
    flexDirection: "row",

    alignItems: "center",
  },

  trustIcon: {
    width: 19,
    height: 19,

    borderRadius: 10,

    backgroundColor: "#E2E8F0",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 5,
  },

  trustText: {
    fontSize: 12,

    color: "#475569",

    fontWeight: "500",
  },


  // ==========================================================
  // COPYRIGHT
  // ==========================================================

  copyright: {
    marginTop: 18,

    fontSize: 11,

    color: "#64748B",

    textAlign: "center",
  },
});

export default styles;